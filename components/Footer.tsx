import Link from "next/link";
import { Volume2 } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-950">
			<div className="container mx-auto px-4">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="md:col-span-1">
						<Link
							href="/"
							className="flex items-center gap-2 text-xl font-bold"
						>
							<Volume2 className="h-6 w-6 text-violet-600" />
							<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
								DBucks
							</span>
						</Link>
						<p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
							Turn Up the Volume, Cash In the Sound! 🔊💰
						</p>
					</div>

					<div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
						<div>
							<h3 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-gray-100">
								Platform
							</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="/how-it-works"
										className="text-gray-600 hover:text-violet-600 dark:text-gray-400"
									>
										How It Works
									</Link>
								</li>
								<li>
									<Link
										href="/pricing"
										className="text-gray-600 hover:text-violet-600 dark:text-gray-400"
									>
										Pricing
									</Link>
								</li>
							</ul>
						</div>


						<div>
							<h3 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-gray-100">
								Legal
							</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="/privacy"
										className="text-gray-600 hover:text-violet-600 dark:text-gray-400"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms"
										className="text-gray-600 hover:text-violet-600 dark:text-gray-400"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="/cookies"
										className="text-gray-600 hover:text-violet-600 dark:text-gray-400"
									>
										Cookie Policy
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
					<p className="text-center text-sm text-gray-600 dark:text-gray-400">
						© {new Date().getFullYear()} DBucks. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
