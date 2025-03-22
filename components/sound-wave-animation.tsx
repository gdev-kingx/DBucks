"use client";

import { useEffect, useRef } from "react";

export default function SoundWaveAnimation() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas dimensions to match parent
		const resizeCanvas = () => {
			const parent = canvas.parentElement;
			if (parent) {
				canvas.width = parent.offsetWidth;
				canvas.height = parent.offsetHeight;
			}
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// Sound wave animation parameters
		const waves = [
			{ frequency: 0.02, amplitude: 50, speed: 0.05, color: "#8b5cf6" },
			{ frequency: 0.03, amplitude: 30, speed: 0.03, color: "#6366f1" },
			{ frequency: 0.01, amplitude: 70, speed: 0.02, color: "#a78bfa" },
		];

		let animationFrameId: number;
		let time = 0;

		// Animation function
		const animate = () => {
			time += 0.05;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			waves.forEach((wave) => {
				ctx.beginPath();
				ctx.moveTo(0, canvas.height / 2);

				for (let x = 0; x < canvas.width; x++) {
					const y =
						Math.sin(x * wave.frequency + time * wave.speed) *
							wave.amplitude +
						canvas.height / 2;
					ctx.lineTo(x, y);
				}

				ctx.strokeStyle = wave.color;
				ctx.lineWidth = 3;
				ctx.stroke();
			});

			animationFrameId = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return <canvas ref={canvasRef} className="h-full w-full" />;
}
