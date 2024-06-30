import styled from "styled-components";
import DialogWindow from "./DialogWindow";
import { useEffect, useState } from "react";
import { Workday } from "@/types/Workday";
import moment from "moment";
import { AppStorage } from "@/AppStorage";

const StyledTimeInputDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: strech;
	align-self: center;		
	flex: 1 1 0%;
	width: 135px;
	font-size: x-large;

	> span {
		display: flex;
		align-items: center;
	}
`;

interface Props {
	onClose: () => void;	
	workdays: Workday[];
	setWorkdays: React.Dispatch<React.SetStateAction<Workday[]>>;
	selectedDate?: Date;
}

export default function EditWorkdayDialog(props: Props) {
	const [timeStart, setTimeStart] = useState("");
	const [timeEnd, setTimeEnd] = useState("");

	useEffect(() => {
		if (props.selectedDate === undefined) {
			return;
		}

		const workday = props.workdays.find(wd => wd.date.getTime() === props.selectedDate?.getTime());

		if (!workday) {
			return;
		}

		setTimeStart(workday.startTime);
		setTimeEnd(workday.endTime);
	}, []);

	function saveAndQuit() {
		if (!props.selectedDate) {
			return;
		}

		const newWorkday: Workday = {
			date: props.selectedDate,
			startTime: timeStart,
			endTime: timeEnd
		};

		props.setWorkdays((prevWorkdays) => {
			let updatedWorkdays;

			if (props.workdays.find(wd => wd.date.getTime() === props.selectedDate?.getTime())) {
				updatedWorkdays = props.workdays.map((wd: Workday) => {
					if (wd.date.getTime() === props.selectedDate?.getTime()) {
						wd.startTime = timeStart;
						wd.endTime = timeEnd;
					}

					return wd;
				});
			} else {
				updatedWorkdays = [...props.workdays, newWorkday];
			}

			for (let wd of updatedWorkdays) {
				wd.date.toJSON = function() { return moment(this).format(); }
			}

			AppStorage.saveWorkdays(updatedWorkdays);

			return updatedWorkdays;
		});

		props.onClose();
	}

	function deleteWorkday() {
		if (props.selectedDate === undefined) {
			return;
		}

		if (doesWorkdayExist()) {
			if (props.workdays.length === 1) {
				props.setWorkdays([]);
				props.onClose();
				return;
			}

			props.setWorkdays((prevWorkdays) => {
				const updatedWorkdays = props.workdays.filter(wd => !(
					wd.date.getFullYear() === props.selectedDate?.getFullYear() &&
					wd.date.getMonth() === props.selectedDate?.getMonth() &&
					wd.date.getDate() === props.selectedDate?.getDate())
				);

				AppStorage.saveWorkdays(updatedWorkdays);

				return updatedWorkdays;
			});

			props.onClose();
		}
	}

	function doesWorkdayExist(): boolean {
		if (!props.workdays) {
			return false;
		}

		return props.workdays.some(wd => wd.date.toDateString() === props.selectedDate?.toDateString());
	}

	function getWeekday(): string {
		var options = {  weekday: 'long' } as Intl.DateTimeFormatOptions;
		var weekday = props.selectedDate?.toLocaleString('cs-CZ', options);

		if (!weekday) {
			return "";
		}

		return weekday;
	}

	return (
		<DialogWindow
			title={"Směna " + getWeekday() + " " + props.selectedDate?.toLocaleDateString()}
			onSave={saveAndQuit}
			onCancel={props.onClose}
			useExtraButton={true}
			isExtraButtonEnabled={doesWorkdayExist()}
			extraButtonTitle="Smazat"
			extraButtonOnClick={deleteWorkday}
		>
				<StyledTimeInputDiv>
					<span>Od</span>
					<input
						type="time"
						value={timeStart}
						onChange={(e) => setTimeStart(e.target.value)}
					/>
				</StyledTimeInputDiv>

				<StyledTimeInputDiv>
					<span>Do</span>
					<input
						type="time"
						value={timeEnd}
						onChange={(e) => setTimeEnd(e.target.value)}
					/>
				</StyledTimeInputDiv>
		</DialogWindow>
	);
}
