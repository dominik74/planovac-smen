import styled from "styled-components";
import { Button } from "./Button";
import { H1 } from "./H1";
import { ChangeEvent, useEffect, useState } from "react";
import { Workday } from "@/types/Workday";
import moment from "moment";
import { AppStorage } from "@/AppStorage";

const StyledEditWorkdayDialog = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	width: 100vw;
	background: rgba(0, 0, 0, 0.25);	
`;

const StyledWindow = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 350px;
	margin: 10px;
	background: white;	
	padding: 8px;
	border-radius: 4px;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const StyledBottomDiv = styled.div`
	display: flex;
	justify-content: end;
	margin-top: auto;

	> .leftbutton {
		margin-right: auto;
	}

	> .cancelbutton {
		margin-right: 8px;
	}
`;

const StyledTimeInputDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: strech;
	align-self: center;		
	flex: 1 1 0%;
	width: 215px;

	> span {
		display: flex;
		align-items: center;
	}
`;

interface Props {
	isVisible: boolean;	
	setIsVisible: (arg0: boolean) => void;
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

		props.setIsVisible(false);
	}

	function deleteWorkday() {
		if (props.selectedDate === undefined) {
			return;
		}

		if (doesWorkdayExist()) {
			if (props.workdays.length === 1) {
				props.setWorkdays([]);
				props.setIsVisible(false);
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

			props.setIsVisible(false);
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
		<StyledEditWorkdayDialog>
			<StyledWindow>
				<H1>Upravit směnu {getWeekday()} {props.selectedDate?.toLocaleDateString()}</H1>

				<StyledTimeInputDiv>
					<span>Od:</span>
					<input
						type="time"
						value={timeStart}
						onChange={(e) => setTimeStart(e.target.value)}
					/>
				</StyledTimeInputDiv>

				<StyledTimeInputDiv>
					<span>Do:</span>
					<input
						type="time"
						value={timeEnd}
						onChange={(e) => setTimeEnd(e.target.value)}
					/>
				</StyledTimeInputDiv>

				<br />
				<StyledBottomDiv>
					<Button className="leftbutton" $isPrimary={false} onClick={deleteWorkday} disabled={!doesWorkdayExist()}>Smazat</Button>
					<Button className="cancelbutton" $isPrimary={false} onClick={() => props.setIsVisible(false)}>Zrušit</Button>
					<Button $isPrimary={true} onClick={() => saveAndQuit()}>Uložit</Button>
				</StyledBottomDiv>
			</StyledWindow>
		</StyledEditWorkdayDialog>
	);
}
