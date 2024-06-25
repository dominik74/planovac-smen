import styled from "styled-components";

const StyledIconButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 38px;
	min-width: 38px;
	height: 38px;
	border-radius: 4px;

	&:hover {
		border: 2px solid lightgray;
	}

	> img {
		width: 24px;
		height: 24px;
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
