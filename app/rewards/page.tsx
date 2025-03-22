'use client';
import { useState, useEffect } from 'react';
import { Volume2, VolumeX, TrendingUp, GraduationCap } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

interface RewardTier {
    name: string;
    minDb: number;
    maxDb: number;
    tokensPerHour: number;
    color: string;
    description: string;
}

export default function RewardsPage() {
    const { user, isSignedIn } = useUser();
    const [currentDb, setCurrentDb] = useState<number>(0);
    const [currentTier, setCurrentTier] = useState<RewardTier | null>(null);
    const [totalTokens, setTotalTokens] = useState<number>(0);
    const [isTracking, setIsTracking] = useState<boolean>(false);
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

    const rewardTiers: RewardTier[] = [
        {
            name: 'Library Mode',
            minDb: 0,
            maxDb: 30,
            tokensPerHour: 50,
            color: 'from-green-400 to-emerald-400',
            description: 'Perfect for deep focus and meditation. Earn tokens in quiet environments.'
        },
        {
            name: 'Study Hall',
            minDb: 31,
            maxDb: 50,
            tokensPerHour: 75,
            color: 'from-blue-400 to-cyan-400',
            description: 'Ideal for focused learning and reading. Moderate background noise.'
        },
        {
            name: 'Classroom',
            minDb: 51,
            maxDb: 70,
            tokensPerHour: 100,
            color: 'from-purple-400 to-violet-400',
            description: 'Active learning environment with discussions and collaboration.'
        },
        {
            name: 'Workshop',
            minDb: 71,
            maxDb: 90,
            tokensPerHour: 150,
            color: 'from-orange-400 to-red-400',
            description: 'High-energy environment for practical learning and group work.'
        }
    ];

    useEffect(() => {
        if (!isTracking || !currentTier) return;

        const updateTokens = () => {
            const now = new Date();
            const timeDiff = (now.getTime() - lastUpdate.getTime()) / 1000; // in seconds
            const tokensEarned = (currentTier.tokensPerHour / 3600) * timeDiff;
            
            setTotalTokens(prev => prev + tokensEarned);
            setLastUpdate(now);
        };

        const tokenInterval = setInterval(updateTokens, 1000);
        return () => clearInterval(tokenInterval);
    }, [isTracking, currentTier, lastUpdate]);

    useEffect(() => {
        const tier = rewardTiers.find(
            tier => currentDb >= tier.minDb && currentDb <= tier.maxDb
        );
        setCurrentTier(tier || null);
    }, [currentDb]);

    useEffect(() => {
        if (!isTracking) return;

        const fetchDbLevel = async () => {
            try {
                // Simulate dB level changes
                const maxChange = 5;
                const minDb = Math.max(0, currentDb - maxChange);
                const maxDb = Math.min(90, currentDb + maxChange);
                const newDb = Math.random() * (maxDb - minDb) + minDb;
                setCurrentDb(newDb);
            } catch (error) {
                console.error('Failed to update dB level:', error);
            }
        };

        const dbInterval = setInterval(fetchDbLevel, 1000);
        return () => clearInterval(dbInterval);
    }, [isTracking, currentDb]);

    const toggleTracking = () => {
        if (!isTracking) {
            setLastUpdate(new Date());
        }
        setIsTracking(!isTracking);
    };

    const formatTokens = (tokens: number) => {
        return Math.floor(tokens).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-violet-950 to-black text-white p-4">
            <div className="container mx-auto px-4 pt-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        Learn & Earn with{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            DBucks EDU
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Transform your learning environment into rewards. Monitor sound levels, maintain optimal study conditions, and earn EDU tokens.
                    </p>
                </div>

                {/* Current Status */}
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 mb-8 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Learning Environment</h2>
                            <p className="text-gray-400">Your sound levels influence your rewards</p>
                        </div>
                        <button
                            onClick={toggleTracking}
                            className={`px-6 py-3 rounded-full font-medium transition-all
                                ${isTracking
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-gradient-to-r from-purple-400 to-cyan-400 hover:shadow-lg hover:shadow-purple-500/25'
                                }`}
                        >
                            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-black/30 rounded-lg p-6 border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                {currentDb > 0 ? (
                                    <Volume2 className="h-5 w-5 text-cyan-400" />
                                ) : (
                                    <VolumeX className="h-5 w-5 text-gray-400" />
                                )}
                                <h3 className="font-medium">Sound Level</h3>
                            </div>
                            <p className="text-3xl font-bold">{currentDb.toFixed(1)} dB</p>
                            <p className="text-sm text-gray-400 mt-1">Real-time measurement</p>
                        </div>

                        <div className="bg-black/30 rounded-lg p-6 border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <GraduationCap className="h-5 w-5 text-purple-400" />
                                <h3 className="font-medium">Learning Zone</h3>
                            </div>
                            <p className="text-3xl font-bold">{currentTier?.name || 'Not in range'}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                {currentTier ? `${currentTier.tokensPerHour} EDU/hour` : 'Start tracking to earn'}
                            </p>
                        </div>

                        <div className="bg-black/30 rounded-lg p-6 border border-white/5">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="h-5 w-5 text-green-400" />
                                <h3 className="font-medium">EDU Balance</h3>
                            </div>
                            <p className="text-3xl font-bold">{formatTokens(totalTokens)} EDU</p>
                            <p className="text-sm text-gray-400 mt-1">
                                {isTracking ? 'Actively earning' : 'Start tracking to earn'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reward Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {rewardTiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`relative group bg-black/30 rounded-lg p-6 border transition-all duration-300
                                ${currentTier?.name === tier.name 
                                    ? 'border-cyan-400/50 shadow-lg shadow-cyan-400/10' 
                                    : 'border-white/10 hover:border-white/20'
                                }
                            `}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${tier.color} opacity-5 rounded-lg group-hover:opacity-10 transition-opacity`} />
                            
                            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                            <div className="space-y-2">
                                <p className="text-gray-400 text-sm">{tier.description}</p>
                                <div className="pt-2 border-t border-white/5">
                                    <p className="text-sm text-gray-400">Range: {tier.minDb} - {tier.maxDb} dB</p>
                                    <p className="font-medium text-lg text-cyan-400">
                                        {tier.tokensPerHour} EDU/hour
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">How It Works</h2>
                    <div className="space-y-4 text-gray-300">
                        <p>
                            DBucks EDU rewards you for maintaining optimal learning environments.
                            Different sound levels correspond to different learning contexts,
                            each with its own reward rate.
                        </p>
                        <p>
                            Start tracking to begin earning EDU tokens. The quieter and more
                            conducive your environment is for learning, the more tokens you earn.
                            Use these tokens for educational resources and special features.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}