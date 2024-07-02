import { AppStorage } from "@/AppStorage";
import { DayType } from "@/types/DayType";
import { Workday } from "@/types/Workday";
import { addDays, eachDayOfInterval, endOfMonth, isToday, startOfMonth, startOfWeek, subDays } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Day from "./Day";

const StyledCalendar = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1 0%;	
`;

const StyledWeekdayGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
	grid-auto-rows: 1fr;
`;

const StyledGrid = styled.div`
	display: grid;
	flex: 1;	
	grid-template-columns: repeat(7, minmax(0, 1fr));
	grid-auto-rows: 1fr;
`;

const StyledWeekday = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	border: 1px solid black;
`;

interface Props {
	viewingMonth: number;	
	workdays: Workday[];
	setWorkdays: React.Dispatch<React.SetStateAction<Workday[]>>;
	setIsEditWorkdayDialogVisible: (arg0: boolean) => void;
	setSelectedDate: (arg0: Date) => void;
	patternOffset: number;
}

export default function Calendar(props: Props) {
	const [relativeDistances, setRelativeDistances] = useState<number[]>([]);


	const currentDate = new Date();
	const viewingDate = new Date(currentDate.getFullYear(), props.viewingMonth, currentDate.getDate());

	const startOfMonthDay = startOfMonth(viewingDate).getDay();
	const endOfMonthDay = endOfMonth(viewingDate).getDay();

	const days = eachDayOfInterval({start: startOfMonth(viewingDate), end: endOfMonth(viewingDate)});


	useEffect(() => {
		props.setWorkdays(AppStorage.loadWorkdays());
	}, []);

	useEffect(() => {
		let reldists = [];
		for (let wd of props.workdays) {
			reldists.push(getTotalDays(wd.date) - getTotalDays(getStartPatternDate()));
		}
	
		setRelativeDistances(reldists);
	}, [props.workdays]);


    function getEndingDayIndex(): number {
        const index = endOfMonthDay - 1;
        return index < 0 ? 6 : index;
    }

    function getStartingDayIndex(): number {
        const index = startOfMonthDay - 1;
        return index < 0 ? 6 : index;
    }

	function isWorkday(date: Date): boolean {
		return props.workdays.find(wd =>
							 wd.date.getFullYear() === date.getFullYear() &&
							 wd.date.getMonth() === date.getMonth() &&
							wd.date.getDate() === date.getDate()) !== undefined;
	}

	function addWorkday(date: Date) {
		props.setSelectedDate(date);
		props.setIsEditWorkdayDialogVisible(true);
		console.log(props.workdays);
	}

	function getPrevMonthDate(i: number): Date {
		return subDays(startOfMonth(viewingDate), (getStartingDayIndex() - i - 1) + 1);
	}

	function getNextMonthDate(i: number): Date {
		return addDays(endOfMonth(viewingDate), i + 1);
	}

	function getTotalDays(date: Date): number {
		const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

		const epoch = new Date('1970-01-01T00:00:00Z');

		const diffInMilliseconds = normalizedDate.getTime() - epoch.getTime();

		const millisecondsPerDay = 1000 * 60 * 60 * 24;
		const totalDays = Math.floor(diffInMilliseconds / millisecondsPerDay);

		return totalDays;
	}

	function getStartPatternDate(): Date {
		let smallestDate = props.workdays[0].date;

		for (let i = 1; i < props.workdays.length; i++) {
			if (getTotalDays(props.workdays[i].date) < getTotalDays(smallestDate)) {
				smallestDate = props.workdays[i].date;
			}
		}

		return smallestDate;
	}

	function getEndPatternDate(): Date {
		let largestDate = props.workdays[0].date;

		for (let i = 1; i < props.workdays.length; i++) {
			if (getTotalDays(props.workdays[i].date) > getTotalDays(largestDate)) {
				largestDate = props.workdays[i].date;
			}
		}

		return largestDate;
	}

	function getNearestStartPatternDate(date: Date) {
		const patternLength = getTotalDays(getEndPatternDate()) - getTotalDays(getStartPatternDate()) + props.patternOffset + 1;
		const numOfPatternsSinceOrigStartOfPattern =
			Math.floor((getTotalDays(date) - getTotalDays(getStartPatternDate())) / patternLength);
		const daysSinceOrigStartOfPattern = numOfPatternsSinceOrigStartOfPattern * patternLength;

		return addDays(getStartPatternDate(), daysSinceOrigStartOfPattern);
	}

	function getGeneratedWorkdayIndex(date: Date): number {
		const dist = getTotalDays(date) - getTotalDays(getNearestStartPatternDate(date));
		console.log(dist);

		for (let i = 0; i < relativeDistances.length; i++) {
			if (relativeDistances[i] === dist) {
				return i;
			}
		}

		return -1;
	}

	function getDayType(date: Date, isOtherMonth: boolean): DayType {
		if (props.workdays.length === 0) {
			return isOtherMonth ? DayType.OtherMonth : DayType.Normal;
		}

		if (isWorkday(date)) {
			return DayType.WorkdayMarked;
		}

		if (getGeneratedWorkdayIndex(date) !== -1) {
			return DayType.WorkdayGenerated;
		}

		return isOtherMonth ? DayType.OtherMonth : DayType.Normal;
	}

	function getWorkday(date: Date): Workday | undefined {
		if (props.workdays.length === 0) {
			return undefined;
		}

		return props.workdays[getGeneratedWorkdayIndex(date)];
	}

	return (
		<StyledCalendar>
			{/* weekdays */}
			<StyledWeekdayGrid>
				{[...Array(7)].map((_, i) => (
					<StyledWeekday key={i}>
						{/* todo?: more universal solution (handle start of week day based on locale) */}
						{new Intl.DateTimeFormat("cs-CZ", { weekday: 'short' }).format(new Date(1970, 0, i + 5))}
					</StyledWeekday>
				))}
			</StyledWeekdayGrid>

			{/* days */}
			<StyledGrid>
				{Array.from({length: getStartingDayIndex()}).map((_, i) => (
					<Day
						key={i}
						onClick={() => addWorkday(getPrevMonthDate(i))}
						isToday={false}
						dayType={getDayType(getPrevMonthDate(i), true)}
						workday={getWorkday(getPrevMonthDate(i))}
						day={getPrevMonthDate(i).getDate()}
					/>
				))}

				{days.map((day, i) => (
					<Day
						key={i} 
						onClick={() => addWorkday(day)}
						isToday={isToday(day)}
						dayType={getDayType(day, false)}
						workday={getWorkday(day)}
						day={day.getDate()}
					/>
				))}

				{Array.from({length: 7 - getEndingDayIndex() - 1}).map((_, i) => (
					<Day
						key={i}
						onClick={() => addWorkday(getNextMonthDate(i))}
						isToday={false}
						dayType={getDayType(getNextMonthDate(i), true)}
						workday={getWorkday(getNextMonthDate(i))}
						day={getNextMonthDate(i).getDate()}
					/>
				))}
			</StyledGrid>
		</StyledCalendar>
	);
}
