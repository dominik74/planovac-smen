import styled from "styled-components";

interface Props {
	$isPrimary: boolean;
}

export const Button = styled.button<Props>`
	height: 38px;
	border: ${props => props.$isPrimary ? "none" : "1px solid lightgray"};
	border-radius: 6px;
	padding: 0 10px;
	background: ${props => props.$isPrimary ? "#3b82f6" : "white"};
	color: ${props => props.$isPrimary ? "white" : "black"};

	&:hover:enabled {
		background: ${props => props.$isPrimary ? "#4f96f6" : "rgb(240, 240, 240)"};
	}

	&:disabled {
		color: gray;
		border: 1px solid lightgray;
	}
`;
