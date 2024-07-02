import styled from "styled-components";
import { DayType } from "@/types/DayType";
import { Workday } from "@/types/Workday";

interface StyledDayProps {
	$isToday: boolean;
	$dayType: DayType;
}

function getBackgroundColor(dayType: DayType) {
	switch (dayType) {
		case DayType.Normal:
			return "none";
		case DayType.OtherMonth:
			return "#f2f2f2";
		case DayType.WorkdayMarked:
			return "yellow";
		case DayType.WorkdayGenerated:
			return "orange";
	}
}

const StyledDay = styled.div<StyledDayProps>`
	display: flex;
	flex-direction: column;
	padding: 2px 4px;
	border: 1px solid lightgray;
	// height: 96px;
	background: ${props => getBackgroundColor(props.$dayType)};
	box-sizing: border-box;

	> span {
		${props => props.$isToday ? `
			display: flex;
			justify-content: center;
			align-items: center;
		`
		: ""}

		background: ${props => props.$isToday ? "#3b82f6" : "none"};
		color: ${props => props.$isToday ? "white" : "black"};
		font-weight: ${props => props.$isToday ? "bold" : "normal"};
		width: 24px;
		height: 24px;
		border-radius: 2px;
	}
`;

interface Props {
	onClick: () => void;
	isToday: boolean;
	dayType: DayType;
	workday?: Workday;
	day: number;
}

export default function Day(props: Props) {
	return (
		<StyledDay
			onClick={props.onClick}
			$isToday={props.isToday}
			$dayType={props.dayType}
		>
			<span>
				{props.day}
			</span>
			{(props.dayType === DayType.WorkdayMarked ||
			  props.dayType === DayType.WorkdayGenerated) &&
					<div>
						<span>{props.workday?.startTime}</span>
						—
						<span>{props.workday?.endTime}</span>
					</div>
			}
		</StyledDay>
	) 
}

