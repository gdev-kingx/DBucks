"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send, Volume2, Instagram, Github, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	subject: z
		.string()
		.min(5, { message: "Subject must be at least 5 characters." }),
	message: z
		.string()
		.min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsSubmitting(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		form.reset();

		toast.success("Message sent!", {
			description: "We'll get back to you as soon as possible.",
		});
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-background/80">
			<div className="container px-4 py-20 mx-auto max-w-5xl">
				<div className="flex flex-col items-center text-center mb-12">
					<div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
						<Volume2 className="w-8 h-8 text-primary animate-pulse" />
					</div>
					<h1 className="text-4xl font-bold tracking-tight mb-2">
						Contact DBucks
					</h1>
					<p className="text-xl text-blue-700 max-w-2xl">
						Every Decibel Counts! 🔊💰
					</p>
				</div>

				<div className="grid gap-10 md:grid-cols-2">
					<Card className="p-6 border border-primary/20 bg-gradient-to-r from-purple-400 to-cyan-400 backdrop-blur-sm">
						<div className="mb-8">
							<h2 className="text-2xl font-semibold mb-2">
								Get in Touch
							</h2>
							<p className="text-blue-700">
								Have questions about turning decibels into
								digital gold? Our team is ready to help you
								navigate the sound economy.
							</p>
						</div>

						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									placeholder="Your name"
									{...form.register("name")}
								/>
								{form.formState.errors.name && (
									<p className="text-sm text-destructive">
										{form.formState.errors.name.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="your.email@example.com"
									{...form.register("email")}
								/>
								{form.formState.errors.email && (
									<p className="text-sm text-destructive">
										{form.formState.errors.email.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									placeholder="What's this about?"
									{...form.register("subject")}
								/>
								{form.formState.errors.subject && (
									<p className="text-sm text-destructive">
										{form.formState.errors.subject.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="message">Message</Label>
								<Textarea
									id="message"
									placeholder="Tell us how we can help..."
									className="min-h-[120px]"
									{...form.register("message")}
								/>
								{form.formState.errors.message && (
									<p className="text-sm text-destructive">
										{form.formState.errors.message.message}
									</p>
								)}
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={isSubmitting}
							>
								{isSubmitting ? (
									<>
										<span className="mr-2">Sending</span>
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
									</>
								) : (
									<>
										<Send className="mr-2 h-4 w-4" /> Send
										Message
									</>
								)}
							</Button>
						</form>
					</Card>

					<div className="space-y-8">
						<Card className="p-6 border border-primary/20 bg-gradient-to-r from-purple-400 to-cyan-400 backdrop-blur-sm">
							<h2 className="text-2xl font-semibold mb-4">
								Connect With Us
							</h2>

							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
										<Instagram className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="font-medium">
											Instagram
										</h3>
										<a
											href="https://www.instagram.com"
											className="text-primary hover:underline"
										>
											@DBucks_Official
										</a>
									</div>
								</div>

								<div className="flex items-center space-x-3">
									<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
										<Linkedin className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="font-medium">
											Linkedin
										</h3>
										<a
											href="https://www.linkedin.com"
											className="text-primary hover:underline"
										>
											Join our community
										</a>
									</div>
								</div>

								<div className="flex items-center space-x-3">
									<div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
										<Github className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="font-medium">Github</h3>
										<a
											href="https://www.github.com"
											className="text-primary hover:underline"
										>
											github.com/DBucks
										</a>
									</div>
								</div>
							</div>
						</Card>

						<Card className="p-6 border border-primary/20 bg-gradient-to-r from-purple-400 to-cyan-400 backdrop-blur-sm">
							<h2 className="text-2xl font-semibold mb-4">
								Frequently Asked Questions
							</h2>

							<div className="space-y-4">
								<div>
									<h3 className="font-medium">
										How does DBucks work?
									</h3>
									<p className="text-blue-700">
										DBucks measures sound levels in decibels
										and rewards users with crypto tokens
										based on the sound data they interact
										with.
									</p>
								</div>

								<div>
									<h3 className="font-medium">
										When will DBucks launch?
									</h3>
									<p className="text-blue-700">
										Join our community channels to stay
										updated on our launch timeline and early
										access opportunities.
									</p>
								</div>

								<div>
									<h3 className="font-medium">
										How can I become a partner?
									</h3>
									<p className="text-blue-700">
										We're looking for strategic partners!
										Contact us through this form with the
										subject "Partnership Inquiry".
									</p>
								</div>
							</div>
						</Card>
					</div>
				</div>

				<div className="mt-16 text-center">
					<div className="inline-flex items-center justify-center space-x-2 mb-4">
						{[1, 2, 3, 4, 5].map((i) => (
							<div
								key={i}
								className="w-1 bg-primary animate-sound-wave"
								style={{
									height: `${Math.random() * 24 + 8}px`,
									animationDelay: `${i * 0.1}s`,
								}}
							/>
						))}
					</div>
					<p className="text-muted-foreground">
						DBucks — Transforming real-world sound levels into
						value. Every decibel counts!
					</p>
				</div>
			</div>
		</div>
	);
}
