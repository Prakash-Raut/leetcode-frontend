import { Button } from "../ui/button";

export default function ProblemDetail() {
	return (
		<div className="flex space-x-2">
			<Button
				variant="outline"
				size="sm"
				className="text-yellow-500"
			>
				Medium
			</Button>
			<Button
				variant="outline"
				size="sm"
			>
				Topics
			</Button>
			<Button
				variant="outline"
				size="sm"
			>
				Companies
			</Button>
		</div>
	);
}
