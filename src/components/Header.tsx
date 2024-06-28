import { Button } from "antd";
import styled from "styled-components";
import IconButton from "./IconButton";
import { format } from "date-fns";
import { H1 } from "./H1";
import { prefix } from "@/prefix";

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

interface Props {
	isSideBarVisible: boolean;
	setIsSideBarVisible: (arg0: boolean) => void;
	viewingMonthIndex: number;
	setViewingMonthIndex: (arg0: number) => void;
	patternOffset: number;
	setPatternOffset: React.Dispatch<React.SetStateAction<number>>;
	setIsEditPatternOffsetDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

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

	return (
		<StyledHeader>
			<StyledToolbar>
				<IconButton
					src={`${prefix}/pattern-offset.svg`}
					alt="edit pattern offset"
					onClick={() => props.setIsEditPatternOffsetDialogVisible(true)}
				/>
			</StyledToolbar>

			<H1>Plánovač směn</H1>

			<StyledMonthControls>
				<IconButton
					src={`${prefix}/arrow-left.svg`}
					alt="arrow left"
					onClick={decrementMonthIndex}
				/>

				<p>{getDate()}</p>

				<IconButton
					src={`${prefix}/arrow-right.svg`}
					alt="arrow right"
					onClick={incrementMonthIndex}
				/>
			</StyledMonthControls>
		</StyledHeader>
	);
}
