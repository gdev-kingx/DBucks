'use client';

import { useAudio } from './useAudio';
import SoundWaveAnimation from "@/components/sound-wave-animation";
import { Volume2, Mic, StopCircle, MicOff, Timer } from "lucide-react";

export default function AudioTracker() {
    const {
        isRecording,
        dbLevel,
        remainingTime,
        status,
        isMuted,
        playTone,
        startRecording,
        stopRecording,
        formatTime,
    } = useAudio();

    return (
        <div className="flex min-h-screen flex-col">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-violet-950 to-black py-20 text-white md:py-32">
                <div className="absolute inset-0 z-0 opacity-20">
                    <SoundWaveAnimation />
                </div>
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                        Audio{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            dB Meter
                        </span>
                    </h1>
                    
                    <div className="mx-auto mb-8 flex flex-col items-center space-y-8">
                        {/* Recording Status */}
                        <div className="flex items-center gap-2">
                            {isRecording ? (
                                <div className="flex items-center gap-2 text-red-400">
                                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                                    Recording in Progress
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-400">
                                    <div className="h-3 w-3 rounded-full bg-gray-500" />
                                    Ready to Record
                                </div>
                            )}
                        </div>

                        {/* Timer Display */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 text-lg text-gray-400">
                                <Timer className="h-5 w-5" />
                                {isRecording ? 'Time Remaining' : 'Recording Duration'}
                            </div>
                            <div className="text-5xl font-mono font-bold tracking-wider">
                                {formatTime(remainingTime)}
                            </div>
                        </div>

                        {/* dB Level Display */}
                        <div className="text-3xl">
                            Sound level:{" "}
                            <span className={`font-mono ${isMuted ? 'text-red-400' : 'text-cyan-400'}`}>
                                {dbLevel ? `${dbLevel.toFixed(1)} dB SPL` : '--'}
                            </span>
                            {isMuted && (
                                <div className="mt-2 text-red-400 text-sm flex items-center justify-center gap-2">
                                    <MicOff className="h-4 w-4" />
                                    Microphone is muted
                                </div>
                            )}
                        </div>

                        {/* Status Message */}
                        <div className="text-gray-400">
                            {status}
                        </div>

                        {/* Control Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <button
                                onClick={() => playTone()}
                                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
                                disabled={isRecording}
                            >
                                <Volume2 className="h-5 w-5" />
                                Play Tone
                            </button>
                            
                            {!isRecording ? (
                                <button
                                    onClick={startRecording}
                                    className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                                >
                                    <Mic className="h-5 w-5" />
                                    Start Recording
                                </button>
                            ) : (
                                <button
                                    onClick={stopRecording}
                                    className="group flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 font-medium text-white transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 animate-pulse"
                                >
                                    <StopCircle className="h-5 w-5" />
                                    Stop Recording
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructions Section */}
            <section className="bg-gray-50 py-20 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                            How to Use
                        </h2>
                        <div className="prose mx-auto dark:prose-invert">
                            <ol className="list-decimal text-left">
                                <li className="mb-4">Click "Play Tone" to hear a 440 Hz reference tone (standard A4 note)</li>
                                <li className="mb-4">Click "Start Recording" to begin measuring sound levels (you'll need to allow microphone access)</li>
                                <li className="mb-4">The dB SPL (Sound Pressure Level) will update in real-time</li>
                                <li className="mb-4">Click "Stop Recording" at any time to end the recording, or it will automatically stop after 1 minute</li>
                                <li>The reference level is 20 µPa (micropascals), which is the standard reference for dB SPL</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}