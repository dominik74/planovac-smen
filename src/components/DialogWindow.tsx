import styled from "styled-components";
import { H1 } from "./H1";
import { Button } from "./Button";
import { useEffect, useState } from "react";

interface StyledDialogWindowProps {
	$isHiding: boolean;
}

const StyledDialogWindow = styled.div<StyledDialogWindowProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	width: 100vw;
	height: 100svh;
	background: rgba(0, 0, 0, 0.25);	
	transition: background 0.2s ease;
	
	${props => props.$isHiding &&`
		background: rgba(0, 0, 0, 0);	
	`} 
`;

interface StyledBottomDivProps {
	$isNonDiscardable: boolean;
}

const StyledBottomDiv = styled.div<StyledBottomDivProps>`
	display: flex;
	${props => props.$isNonDiscardable ? "flex-direction: column;" : ""}
	justify-content: end;
	margin-top: auto;

	> .leftbutton {
		margin-right: auto;
	}

	> .cancelbutton {
		margin-right: 8px;
	}
`;

interface StyledWindowProps {
	$isHiding: boolean;
	$isShowing: boolean;
}


const StyledWindow = styled.div<StyledWindowProps>`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 285px;
	margin: 10px;
	background: white;	
	padding: 12px;
	border-radius: 8px;
	box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	border: 1px solid gray;
    transition: all 0.2s ease-in-out;

	${props => props.$isHiding &&`
		  transform: scale(0);
	`} 

	${props => (props.$isShowing ? `
		transform: scale(1);
	` : `
    	transition: all 0.07s ease-in-out;
		transform: scale(0);
	`)};

	opacity: ${props => (props.$isShowing ? '1' : '0')};

	@media (min-width: 640px) {
		width: 520px;
	} 
`;

interface Props {
	title: string;
	children?: React.ReactNode;
	onSave: () => void;
	onCancel: () => void;
	useExtraButton?: boolean;
	extraButtonTitle?: string;
	extraButtonOnClick?: () => void;
	isExtraButtonEnabled?: boolean;
	isNonDiscardable?: boolean;
}

export default function DialogWindow(props: Props) {
	const [isHiding, setIsHiding] = useState(false);
	const [isShowing, setIsShowing] = useState(false);

	const closeDelay = 200;

	useEffect(() => {
		setIsShowing(true);
	}, []);

	function save() {
		setIsHiding(true);
		setIsShowing(false);
		setTimeout(() => {
			props.onSave();
		}, closeDelay);
	}

	function cancel() {
		setIsHiding(true);
		setIsShowing(false);
		setTimeout(() => {
			props.onCancel();
		}, closeDelay);
	}

	return (
		<StyledDialogWindow $isHiding={isHiding}>
			<StyledWindow
				$isHiding={isHiding}
				$isShowing={isShowing}
			>
				<H1>{props.title}</H1>

				{props.children}

				<br />
				<StyledBottomDiv
					$isNonDiscardable={props.isNonDiscardable ? props.isNonDiscardable : false}
				>
					{props.useExtraButton &&
						<Button
							className="leftbutton"
							$isPrimary={false}
							onClick={props.extraButtonOnClick}
							disabled={props.isExtraButtonEnabled}
						>
							{props.extraButtonTitle}
						</Button>
					}

					{!props.isNonDiscardable &&
						<Button
							className="cancelbutton"
							$isPrimary={false}
							onClick={cancel}
						>
							Zrušit
						</Button>
					}

					<Button $isPrimary={false} onClick={save}>
						{props.isNonDiscardable ?
							"OK"
								:
							"Uložit"
						}
					</Button>
				</StyledBottomDiv>
			</StyledWindow>

		</StyledDialogWindow>
	);
}
