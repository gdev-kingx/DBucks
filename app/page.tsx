import Link from "next/link";
import { ArrowRight, Volume2, Shield, Coins, BarChart2 } from "lucide-react";
import SoundWaveAnimation from "@/components/sound-wave-animation";
import FeatureCard from "@/components/feature-card";
import Footer from "@/components/Footer";
import HowItWorksSection from "@/components/how-it-works";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* Hero Section */}
			<section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-violet-950 to-black py-20 text-white md:py-32">
				<div className="absolute inset-0 z-0 opacity-20">
					<SoundWaveAnimation />
				</div>
				<div className="container relative z-10 mx-auto px-4 text-center">
					<h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
						Turn Up the Volume,{" "}
						<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
							Cash In the Sound!
						</span>
					</h1>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
						DBucks transforms real-world sound levels into
						cryptocurrency. Every decibel you encounter has value in
						our decentralized sound economy.
					</p>
					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
						<Link
							href="/sign-up"
							className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
						>
							Get Started
							<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
						<Link
							href="/about"
							className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
						>
							Learn More
						</Link>
					</div>
				</div>
			</section>

			{/* What is DBucks Section */}
			<section className="bg-gray-50 py-20 dark:bg-gray-900">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-3xl text-center">
						<h2 className="mb-6 text-3xl font-bold md:text-4xl">
							What is DBucks?
						</h2>
						<p className="mb-10 text-lg text-gray-600 dark:text-gray-300">
							DBucks is a revolutionary Web3 platform that
							transforms real-world sound levels into value. Using
							smart devices, we measure sound environments in
							decibels and reward users with crypto tokens based
							on the sound data they interact with.
						</p>
					</div>

					<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						<FeatureCard
							icon={<Volume2 className="h-10 w-10" />}
							title="Sound to Value"
							description="Convert ambient sound and noise levels into cryptocurrency tokens"
						/>
						<FeatureCard
							icon={<Shield className="h-10 w-10" />}
							title="Secure Blockchain"
							description="Transparent and secure data collection on the blockchain"
						/>
						<FeatureCard
							icon={<Coins className="h-10 w-10" />}
							title="Earn Passively"
							description="Earn tokens simply by engaging with sounds around you"
						/>
						<FeatureCard
							icon={<BarChart2 className="h-10 w-10" />}
							title="Real-time Rewards"
							description="Watch your earnings grow in real-time as you collect sound data"
						/>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<HowItWorksSection />

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-violet-600 to-indigo-600 py-20 text-white">
				<div className="container mx-auto px-4 text-center">
					<h2 className="mb-6 text-3xl font-bold md:text-4xl">
						Ready to Turn Sound Into Value?
					</h2>
					<p className="mx-auto mb-8 max-w-2xl text-lg">
						Join the DBucks community today and start earning from
						the sounds around you. Every decibel counts in our
						decentralized sound economy.
					</p>
					<Link
						href="/tracker"
						className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-violet-600 shadow-lg transition-transform hover:scale-105"
					>
						Join the Sound Revolution
						<ArrowRight className="h-5 w-5" />
					</Link>
				</div>
			</section>
			<Footer />
		</div>
	);
}
