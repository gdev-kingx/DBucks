"use client";

import React from "react";
import { CreditCard, Zap, Crown, Check } from "lucide-react";

function App() {
	const plans = [
		{
			name: "Starter",
			price: "₹0",
			icon: <CreditCard className="w-8 h-8 mb-4" />,
			features: [
				"Basic sound monitoring",
				"Daily rewards",
				"Mobile app access",
				"Basic analytics dashboard",
			],
		},
		{
			name: "Pro",
			price: "₹499",
			icon: <Zap className="w-8 h-8 mb-4" />,
			features: [
				"Advanced sound monitoring",
				"Premium rewards multiplier",
				"Priority support",
				"Advanced analytics",
				"API access",
			],
			popular: true,
		},
		{
			name: "Elite",
			price: "₹799",
			icon: <Crown className="w-8 h-8 mb-4" />,
			features: [
				"Enterprise-grade monitoring",
				"Maximum rewards multiplier",
				"24/7 dedicated support",
				"Custom analytics",
				"Unlimited API access",
				"Early access to features",
			],
		},
	];

	const handleSubscribe = (plan: string) => {
		// Simulated NFT token payment integration
		console.log(`Subscribing to ${plan} plan`);
		// Here you would integrate with your Web3 payment gateway
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-cyan-800 py-25 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						Choose Your Sound Journey
					</h1>
					<p className="text-xl text-purple-200 max-w-2xl mx-auto">
						Turn Up the Volume, Cash In the Sound! 🔊💰
					</p>
				</div>

				{/* Pricing Grid */}
				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative rounded-2xl bg-white/10 backdrop-blur-lg p-8 border border-purple-300/20 
                            ${
								plan.popular
									? "transform scale-105 shadow-xl"
									: "shadow-lg"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
									<span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
										Most Popular
									</span>
								</div>
							)}

							<div className="text-center">
								<div className="text-white flex justify-center">
									{plan.icon}
								</div>
								<h3 className="text-2xl font-bold text-white mb-2">
									{plan.name}
								</h3>
								<div className="text-4xl font-bold text-white mb-2">
									{plan.price}
								</div>
							</div>

							<div className="space-y-4 mb-8">
								{plan.features.map((feature) => (
									<div
										key={feature}
										className="flex items-center text-purple-100"
									>
										<Check className="w-5 h-5 mr-3 text-cyan-400" />
										<span>{feature}</span>
									</div>
								))}
							</div>

							<button
								onClick={() => handleSubscribe(plan.name)}
								className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 
                         text-white font-semibold hover:opacity-90 transition-opacity duration-200
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900"
							>
								Subscribe with {plan.name}
							</button>
						</div>
					))}
				</div>

				{/* API Key Notice */}
				<div className="text-center mt-16 text-purple-200 max-w-2xl mx-auto">
					<p className="text-sm">
						All plans include a unique API key for seamless
						integration. Gas fees are optimized for minimal
						transaction costs.
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;
