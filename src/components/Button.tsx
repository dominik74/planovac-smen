import styled from "styled-components";

interface Props {
	$isPrimary: boolean;
}

export const Button = styled.button<Props>`
	height: 38px;
	border: ${props => props.$isPrimary ? "none" : "1px solid lightgray"};
	border-radius: 6px;
	padding: 0 10px;
	background: ${props => props.$isPrimary ? "black" : "white"};
	color: ${props => props.$isPrimary ? "white" : "black"};

	&:hover:enabled {
		background: ${props => props.$isPrimary ? "rgb(45, 45, 45)" : "rgb(240, 240, 240)"};
	}

	&:disabled {
		color: gray;
		border: 1px solid lightgray;
	}
`;
