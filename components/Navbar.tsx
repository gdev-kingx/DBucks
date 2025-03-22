"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
	const [isMounted, setIsMounted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { isSignedIn } = useUser();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Tracker", href: "/tracker" },
		{ name: "Rewards", href: "/rewards" },
		{ name: "Contact Us", href: "/contact" },
	];

	return (
		<div className="w-full p-4 shadow-md bg-gradient-to-r from-purple-400 to-cyan-400 text-white fixed top-0 left-0 z-50">
			<div className="container mx-auto flex justify-between items-center">
				{/* Logo */}
				<Link
					href="/"
					className="text-xl font-bold text-black hover:text-gray-500 hover:opacity-75"
				>
					DBucks
				</Link>

				{/* Desktop Menu - Centered */}
				<div className="hidden md:flex space-x-6 flex-grow justify-center">
					{navItems.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-black hover:text-white font-medium transition duration-300"
						>
							{item.name}
						</Link>
					))}
				</div>

				{/* Subscribe & Auth Buttons */}
				<div className="hidden md:flex space-x-4">
					<Link href="/subscriptions">
						<Button
							variant="outline"
							className="text-black hover:text-white hover:bg-black hover:border-none"
						>
							Subscribe
						</Button>
					</Link>
					{!isSignedIn && (
						<SignInButton>
							<Button
								variant="default"
								className="text-white hover:text-black hover:bg-white hover:border-none"
							>
								Sign In
							</Button>
						</SignInButton>
					)}
					{isSignedIn && <UserButton afterSignOutUrl="/" />}
				</div>

				{/* Mobile Menu */}
				<div className="md:hidden">
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="text-white hover:text-blue-600"
							>
								<Menu className="w-6 h-6" />
							</Button>
						</SheetTrigger>
						<SheetContent
							side="left"
							className="bg-white p-6 w-64 shadow-lg"
						>
							<div className="flex flex-col space-y-4 mt-6">
								{navItems.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className="text-lg text-gray-700 hover:text-blue-600 font-medium transition duration-300"
										onClick={() => setIsOpen(false)}
									>
										{item.name}
									</Link>
								))}
								<Link href="/subscriptions">
									<Button variant="outline" className="mt-4">
										Subscribe
									</Button>
								</Link>
								{!isSignedIn && (
									<SignInButton>
										<Button variant="default">
											Sign In
										</Button>
									</SignInButton>
								)}
								{isSignedIn && (
									<UserButton afterSignOutUrl="/" />
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	);
}
