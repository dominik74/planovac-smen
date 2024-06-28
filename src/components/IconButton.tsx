import { useState } from "react";
import styled from "styled-components";

const StyledIconButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50px;
	min-width: 50px;
	height: 50px;
	border-radius: 6px;

	&:active {
		background: lightgray;
	}

	> img {
		width: 24px;
		height: 24px;
	}

	@media (hover: hover) and (pointer: fine) {
	  &:hover { background: lightgray; }
	}
`;

interface Props {
	src: string;	
	alt?: string;
	onClick?: () => void;
}

export default function IconButton(props: Props) {
	return (
		<StyledIconButton onClick={props.onClick}>
			<img src={props.src} alt={props.alt ? props.alt : ""} />
		</StyledIconButton>
	);
}
