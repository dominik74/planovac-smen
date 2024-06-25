import { Button, Input } from "antd";

interface Props {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
}

export default function NewEventWindow(props: Props) {
	function submit() {
		props.setIsVisible(false);			
	}

	return (
		<div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50">
			<div className="w-fit mx-2 md:w-160 bg-white mb-14 p-4 rounded">
				<h1>New Event</h1>
				<div className="my-4">
					<Input autoFocus className="mb-2" placeholder="Title" />
					<Input placeholder="Group name" />
				</div>

				<Button type="primary" className="float-right" onClick={submit}>Create</Button>
				<Button className="float-right mr-2" onClick={() => props.setIsVisible(false)}>Cancel</Button>
			</div>
		</div>
	);
}
