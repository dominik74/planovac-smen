import styled from "styled-components";
import DialogWindow from "./DialogWindow";
import IconButton from "./IconButton";
import { prefix } from "@/prefix";

const StyledContentDiv = styled.div`
	display: flex;	
	justify-content: space-between;
	align-items: center;
	height: 100%;
	margin: 0 -8px;

	> span {
		font-size: xx-large;
	}

	.hidden {
		color: transparent;
	}
`;

interface Props {
	onClose: () => void;	
	patternOffset: number;
	setPatternOffset: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditPatternOffsetDialog(props: Props) {
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

	function isDecreaseButtonEnabled(): boolean {
		return props.patternOffset > -1;
	}

	return (
		<DialogWindow
			title="Mezera mezi vzory (dny)"
			onSave={props.onClose}
			onCancel={props.onClose}
			isNonDiscardable={true}
		>
			<StyledContentDiv>
				<span></span>
				{isDecreaseButtonEnabled() ?
					<IconButton
						src={`${prefix}/arrow-left.svg`}
						alt="arrow left"
						onClick={()	=> decrementPatternOffset()}
					/>
						:
					<span className="hidden">M</span>
				}

				<span>{props.patternOffset}</span>		

				<IconButton
					src={`${prefix}/arrow-right.svg`}
					alt="arrow right"
					onClick={()	=> incrementPatternOffset()}
				/>
				<span></span>
			</StyledContentDiv>	
		</DialogWindow>
	);
}
