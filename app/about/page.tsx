"use client";

import React from "react";
import { Shield, Waves, Leaf } from "lucide-react";
import TeamMember from "@/components/TeamMember";

const About = () => {
	return (
		<div className="flex min-h-screen flex-col">
			{/* Mission Section */}
			<div className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-violet-950 to-black py-20 text-white md:py-32">
				<div className="container relative z-10 mx-auto px-4 text-center">
					<h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
						Revolutionizing the Sound Economy
					</h1>
					<p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
						At DBucks, we're pioneering a new frontier in the
						digital economy by transforming everyday sound
						experiences into tangible value. Our mission is to
						create a world where acoustic environments contribute to
						economic opportunities while promoting mindful
						interaction with our sonic surroundings.
					</p>
				</div>
			</div>

			{/* Vision & Values */}
			<div className="grid md:grid-cols-2 p-4 gap-12 mb-24">
				<div className="bg-purple-900/20 p-8 rounded-2xl backdrop-blur-sm">
					<h2 className="text-3xl font-bold mb-6">Our Vision</h2>
					<p className="text-gray-700">
						We envision a future where every sound interaction
						becomes an opportunity for value creation. By leveraging
						blockchain technology and smart devices, we're building
						an ecosystem that rewards conscious engagement with our
						acoustic environment while promoting sustainable sound
						practices.
					</p>
				</div>
				<div className="bg-purple-900/20 p-8 rounded-2xl backdrop-blur-sm">
					<h2 className="text-3xl font-bold mb-6">Core Values</h2>
					<ul className="space-y-4 text-gray-700">
						<li className="flex items-center">
							<Shield className="w-6 h-6 mr-3 text-purple-400" />
							<span>
								Security and transparency in all operations
							</span>
						</li>
						<li className="flex items-center">
							<Waves className="w-6 h-6 mr-3 text-purple-400" />
							<span>Innovation in sound technology</span>
						</li>
						<li className="flex items-center">
							<Leaf className="w-6 h-6 mr-3 text-purple-400" />
							<span>Environmental consciousness</span>
						</li>
					</ul>
				</div>
			</div>

			{/* Team Section */}
			<div className="text-center p-4 mb-24">
				<h2 className="text-4xl font-bold mb-16">Meet Our Team</h2>
				<div className="grid md:grid-cols-4 gap-8">
					<TeamMember
						image="/Dps/Sarvesh.jpeg"
						name="R Sarveshvarn"
						role="CEO & Full-Stack Developer"
						linkedInUrl="https://linkedin.com/in/snsaru1578"
						githubUrl="https://github.com/gdev-kingx"
					/>
					<TeamMember
						image="/Dps/Kevin.jpg"
						name="Kevin Jones"
						role="Frontend Developer"
						linkedInUrl="https://linkedin.com/in/jameskevinjones"
						githubUrl="https://github.com/JamesKevinJones"
					/>
					<TeamMember
						image="/Dps/Aditya.jpeg"
						name="Aditya Harish"
						role="Founder & Backend Developer"
						linkedInUrl="https://linkedin.com/in/adithya-harish-74838b334/"
						githubUrl="https://github.com/Ah200512"
					/>
					<TeamMember
						image="/Dps/Naveen.jpeg"
						name="Naveen R"
						role="Designer"
						linkedInUrl="https://linkedin.com/in/naveen-r-9918b9331"
						githubUrl="https://github.com/Naveen-r10"
					/>
				</div>
			</div>

			{/* Join Us Section */}
			<div className="text-center max-w-2xl mx-auto p-4">
				<h2 className="text-4xl font-bold mb-6">
					Join the Sound Revolution
				</h2>
				<p className="text-gray-700 mb-8">
					Be part of the future where sound creates value. Join our
					community of sound pioneers and start earning with DBucks
					today.
				</p>
				<button className="bg-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-500 transition">
                    <a href="/tracker">Get Started Now</a>
				</button>
			</div>
		</div>
	);
};

export default About;
