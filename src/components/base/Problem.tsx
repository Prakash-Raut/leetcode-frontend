import React from "react";

export default function ProblemStatement({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="prose prose-h1:text-gray-200 prose-h3:text-gray-200 prose-h4:text-gray-200 prose-ul:text-gray-200 prose-li:text-gray-200 prose-p:text-gray-200">
			{children}
		</div>
	);
}
