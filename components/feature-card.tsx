import type { ReactNode } from "react";

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export default function FeatureCard({
	icon,
	title,
	description,
}: FeatureCardProps) {
	return (
		<div className="group flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
			<div className="mb-4 rounded-full bg-violet-100 p-3 text-violet-600 transition-transform group-hover:scale-110 dark:bg-violet-900/30 dark:text-violet-400">
				{icon}
			</div>
			<h3 className="mb-2 text-xl font-bold">{title}</h3>
			<p className="text-gray-600 dark:text-gray-300">{description}</p>
		</div>
	);
}
