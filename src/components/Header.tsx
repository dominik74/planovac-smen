import { Button } from "antd";
import styled from "styled-components";
import IconButton from "./IconButton";
import { format } from "date-fns";
import { H1 } from "./H1";

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	padding: 8px;
	// height: 65px;	
	height: 55px;	
`;

const StyledMonthControls = styled.div`
	flex: 1 1 0%;
	display: flex;
	align-items: center;
	justify-content: end;

	> p {
		width: 128px;
		text-align: center;
	}
`;

const StyledToolbar = styled.div`
	display: flex;
	flex: 1 1 0%;
	align-items: center;
	column-gap: 4px;
	width: 200px;
	height: 100%;

	position: relative;
`;

const StyledPatternOffsetSpan = styled.span`
	width: 145px;

	@media (min-width: 640px) {
		width: 175px;
	}
`;

interface Props {
	isSideBarVisible: boolean;
	setIsSideBarVisible: (arg0: boolean) => void;
	viewingMonthIndex: number;
	setViewingMonthIndex: (arg0: number) => void;
	isEditing: boolean;
	setIsEditing: (arg0: boolean) => void;
	patternOffset: number;
	setPatternOffset: React.Dispatch<React.SetStateAction<number>>;}

export default function Header(props: Props) {
	function getDate() {
		const date = new Date();
		date.setMonth(props.viewingMonthIndex);
  		const options = { year: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions;
		return date.toLocaleDateString(undefined, options);
	}

	function incrementMonthIndex() {
		props.setViewingMonthIndex(props.viewingMonthIndex + 1);
	}

	function decrementMonthIndex() {
		props.setViewingMonthIndex(props.viewingMonthIndex - 1);
	}

	function incrementPatternOffset() {
		props.setPatternOffset(() => {
			const updatedPatternOffset = props.patternOffset + 1;
    		localStorage.setItem("patternOffset", updatedPatternOffset.toString());
			return updatedPatternOffset;
		});
	}

	function decrementPatternOffset() {
		props.setPatternOffset(() => {
			const updatedPatternOffset = props.patternOffset - 1;
    		localStorage.setItem("patternOffset", updatedPatternOffset.toString());
			return updatedPatternOffset;
		});
	}

	return (
		<StyledHeader>
				<StyledToolbar>
					<IconButton
						src={props.isEditing ? "/edit.svg" : "/lock.svg"}
						alt="edit"
						onClick={() => props.setIsEditing(!props.isEditing)}
					/>
						
					{props.isEditing && 
						<>
							<IconButton
								src="/arrow-left.svg"
								alt="arrow left"
								onClick={()	=> decrementPatternOffset()}
							/>

							<StyledPatternOffsetSpan>Mezera mezi vzory: {props.patternOffset}</StyledPatternOffsetSpan>
								
							<IconButton
								src="/arrow-right.svg"
								alt="arrow right"
								onClick={()	=> incrementPatternOffset()}
							/>
						</>
					}
				</StyledToolbar>

			{!props.isEditing &&
				<H1>Plánovač směn</H1>
			}							

			<StyledMonthControls>
				<IconButton
					src="/arrow-left.svg"
					alt="arrow left"
					onClick={decrementMonthIndex}
				/>

				<p>{getDate()}</p>

				<IconButton
					src="/arrow-right.svg"
					alt="arrow right"
					onClick={incrementMonthIndex}
				/>
			</StyledMonthControls>
		</StyledHeader>
	);
}
