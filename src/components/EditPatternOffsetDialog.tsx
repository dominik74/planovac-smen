// import styled from "styled-components";
// import { H1 } from "./H1";
// import { Button } from "./Button";
// import IconButton from "./IconButton";
// import { prefix } from "@/prefix";
//
// const StyledEditPatternOffsetDialog = styled.div`
// 	display: flex;
// 	align-items: center;
// 	position: absolute;
// 	top: 0;
// 	width: 100vw;
// 	height: 100svh;
// 	background: rgba(0, 0, 0, 0.25);	
// `;
//
// const StyledWindow = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	width: 100%;
// 	height: 350px;
// 	margin: 10px;
// 	background: white;	
// 	padding: 8px;
// 	border-radius: 4px;
// 	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
// `;
//
// const StyledBottomDiv = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	margin-top: auto;
//
// 	> .leftbutton {
// 		margin-right: auto;
// 	}
//
// 	> .cancelbutton {
// 		margin-right: 8px;
// 	}
// `;
//
// interface Props {
// 
// }
//
// export default function EditPatternOffsetDialog(props: Props) {
// 	return (
// 		<StyledEditPatternOffsetDialog>
// 			<StyledWindow>
// 				<H1>Upravit mezeru mezi vzory</H1>
// 							<IconButton
// 								src={`${prefix}/arrow-left.svg`}
// 								alt="arrow left"
// 								// onClick={()	=> decrementPatternOffset()}
// 							/>
//
// 							
// 							<IconButton
// 								src={`${prefix}/arrow-right.svg`}
// 								alt="arrow right"
// 								// onClick={()	=> incrementPatternOffset()}
// 							/>
// 				<StyledBottomDiv>
// 					<Button $isPrimary>Uložit</Button>
// 				</StyledBottomDiv>
// 			</StyledWindow>			
// 		</StyledEditPatternOffsetDialog>
// 	);
// }

import styled from "styled-components";
import DialogWindow from "./DialogWindow";
import IconButton from "./IconButton";
import { prefix } from "@/prefix";

const StyledContentDiv = styled.div`
	display: flex;	
	justify-content: space-between;
	align-items: center;
	height: 100%;
	// background: red;
	// background: lightgray;
	margin: 0 -8px;
	// padding: 0 16px;

	> span {
		font-size: xx-large;
	}

	// > Button {
	// 	background: yellow;
	// }
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

	return (
		<DialogWindow
			title="Mezera mezi vzory"
			onSave={props.onClose}
			onCancel={props.onClose}
			isNonDiscardable={true}
		>
			<StyledContentDiv>
				<span></span>
				<IconButton
					src={`${prefix}/arrow-left.svg`}
					alt="arrow left"
					onClick={()	=> decrementPatternOffset()}
				/>

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
