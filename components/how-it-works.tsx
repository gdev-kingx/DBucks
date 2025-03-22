"use client";

import { useState, useEffect } from "react";
import { Smartphone, Headphones, Database, Wallet } from "lucide-react";

export default function HowItWorksSection() {
	const [activeStep, setActiveStep] = useState(0);

	const steps = [
		{
			icon: <Smartphone className="h-12 w-12" />,
			title: "Connect Your Device",
			description:
				"Download the DBucks app and connect your smartphone or other smart devices to start capturing sound data.",
		},
		{
			icon: <Headphones className="h-12 w-12" />,
			title: "Collect Sound Data",
			description:
				"Go about your day while your device measures and records ambient sound levels in decibels.",
		},
		{
			icon: <Database className="h-12 w-12" />,
			title: "Secure Blockchain Storage",
			description:
				"Your sound data is securely stored and verified on the blockchain, ensuring transparency and integrity.",
		},
		{
			icon: <Wallet className="h-12 w-12" />,
			title: "Earn DBucks Tokens",
			description:
				"Receive DBucks tokens based on the sound data you've collected, which you can trade or hold as an investment.",
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((prev) => (prev + 1) % steps.length);
		}, 3000);

		return () => clearInterval(interval);
	}, [steps.length]);

	return (
		<section className="py-20">
			<div className="container mx-auto px-4">
				<h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
					How It Works
				</h2>

				<div className="mx-auto max-w-5xl">
					<div className="mb-10 flex justify-between">
						{steps.map((_, index) => (
							<div
								key={index}
								className="relative flex flex-1 justify-center"
							>
								<button
									onClick={() => setActiveStep(index)}
									className={`z-10 flex h-12 w-12 items-center justify-center rounded-full text-white transition-all ${
										activeStep >= index
											? "bg-violet-600"
											: "bg-gray-300 dark:bg-gray-700"
									}`}
								>
									{index + 1}
								</button>
								{index < steps.length - 1 && (
									<div
										className={`absolute top-6 h-1 w-full ${
											activeStep > index
												? "bg-violet-600"
												: "bg-gray-300 dark:bg-gray-700"
										}`}
									/>
								)}
							</div>
						))}
					</div>

					<div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl bg-gray-50 p-8 text-center shadow-lg transition-all dark:bg-gray-800">
						<div className="mb-4 rounded-full bg-violet-100 p-4 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
							{steps[activeStep].icon}
						</div>
						<h3 className="mb-4 text-2xl font-bold">
							{steps[activeStep].title}
						</h3>
						<p className="max-w-lg text-lg text-gray-600 dark:text-gray-300">
							{steps[activeStep].description}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
