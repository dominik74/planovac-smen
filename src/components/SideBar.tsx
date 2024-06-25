import { Button } from "antd";
import styled from "styled-components";

const StyledSideBar = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	background: lightgray;
	height: 100vh;
	width: 100vw;
`;

const StyledHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

interface Props {
	onClose: () => void;	
}

export default function SideBar(props: Props) {
	return (
		<StyledSideBar>
			<StyledHeader>
				<Button type="primary" onClick={() => props.onClose()}>X</Button>
				<p>sidebar</p>
			</StyledHeader>
		</StyledSideBar>
	);
}
