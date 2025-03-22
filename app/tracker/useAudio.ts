import { useState, useRef, useEffect } from 'react';

const SAMPLE_RATE = 44100;
const REFERENCE = 0.00002; // 20 micropascals (reference for dB SPL)
const RECORDING_DURATION = 60; // 1 minute in seconds
const NOISE_FLOOR = -90; // dB SPL noise floor
const SMOOTHING_FACTOR = 0.8; // Higher value = more smoothing
const UPDATE_INTERVAL = 100; // ms
const CALIBRATION_OFFSET = -30; // Adjust this based on your microphone sensitivity

export function useAudio() {
    const [isRecording, setIsRecording] = useState(false);
    const [dbLevel, setDbLevel] = useState<number | null>(null);
    const [remainingTime, setRemainingTime] = useState(RECORDING_DURATION);
    const [status, setStatus] = useState('Ready');
    const [isMuted, setIsMuted] = useState(false);

    const audioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const previousDbRef = useRef<number>(0);
    const bufferRef = useRef<number[]>([]);
    const BUFFER_SIZE = 5; // Number of samples to average

    const cleanup = () => {
        if (recordingIntervalRef.current) {
            clearInterval(recordingIntervalRef.current);
        }
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsRecording(false);
        setRemainingTime(RECORDING_DURATION);
        setStatus('Ready');
        setDbLevel(null);
        setIsMuted(false);
        previousDbRef.current = 0;
        bufferRef.current = [];
    };

    useEffect(() => {
        return cleanup;
    }, []);

    const calculateDb = (dataArray: Float32Array): number => {
        // Calculate RMS (Root Mean Square)
        const rms = Math.sqrt(
            dataArray.reduce((sum, val) => sum + val * val, 0) / dataArray.length
        );
        
        // Convert to dB SPL
        let db = 20 * Math.log10(Math.max(rms, 1e-10) / REFERENCE);
        
        // Apply calibration offset
        db += CALIBRATION_OFFSET;
        
        // Apply noise floor
        if (db < NOISE_FLOOR) {
            return 0;
        }

        return db;
    };

    const smoothDb = (currentDb: number): number => {
        // Add to rolling buffer
        bufferRef.current.push(currentDb);
        if (bufferRef.current.length > BUFFER_SIZE) {
            bufferRef.current.shift();
        }

        // Calculate median to remove outliers
        const sortedBuffer = [...bufferRef.current].sort((a, b) => a - b);
        const medianDb = sortedBuffer[Math.floor(sortedBuffer.length / 2)];

        // Apply exponential smoothing
        const smoothedDb = SMOOTHING_FACTOR * previousDbRef.current + (1 - SMOOTHING_FACTOR) * medianDb;
        previousDbRef.current = smoothedDb;

        // Round to one decimal place
        return Math.round(smoothedDb * 10) / 10;
    };

    const playTone = async (frequency = 440, duration = 2) => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            const oscillator = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
            gainNode.gain.setValueAtTime(0.5, audioContextRef.current.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            setStatus('Playing tone...');
            oscillator.start();
            oscillator.stop(audioContextRef.current.currentTime + duration);

            setTimeout(() => {
                setStatus('Tone finished');
            }, duration * 1000);
        } catch (err) {
            console.error('Error playing tone:', err);
            setStatus('Error playing tone');
        }
    };

    const startRecording = async () => {
        try {
            cleanup(); // Clean up any existing recording

            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }

            mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: false // Disable automatic gain control for more consistent readings
                } 
            });

            const source = audioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
            const analyser = audioContextRef.current.createAnalyser();
            
            analyser.smoothingTimeConstant = 0.5; // Add some built-in smoothing
            analyser.fftSize = 4096; // Increase FFT size for better frequency resolution
            
            source.connect(analyser);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Float32Array(bufferLength);

            setIsRecording(true);
            setStatus('Recording...');
            setRemainingTime(RECORDING_DURATION);

            // Check if audio track is enabled (not muted)
            const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
            setIsMuted(!audioTrack.enabled);

            // Listen for audio track changes
            audioTrack.addEventListener('mute', () => setIsMuted(true));
            audioTrack.addEventListener('unmute', () => setIsMuted(false));

            // Update dB level
            recordingIntervalRef.current = setInterval(() => {
                analyser.getFloatTimeDomainData(dataArray);
                
                // Check if track is enabled and not muted
                if (!audioTrack.enabled || audioTrack.muted || !audioTrack.readyState || audioTrack.readyState === 'ended') {
                    setDbLevel(0);
                    setIsMuted(true);
                    return;
                }

                const rawDb = calculateDb(dataArray);
                const smoothedDb = smoothDb(rawDb);
                
                setDbLevel(smoothedDb);
                setIsMuted(false);
            }, UPDATE_INTERVAL);

            // Update timer
            timerIntervalRef.current = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        cleanup();
                        return RECORDING_DURATION;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (err) {
            console.error('Error:', err);
            const error = err as Error;
            if (error.name === 'NotAllowedError') {
                setStatus('Error: Microphone access denied');
            } else if (error.name === 'NotFoundError') {
                setStatus('Error: No microphone found');
            } else {
                setStatus('Error: ' + error.message);
            }
            cleanup();
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return {
        isRecording,
        dbLevel,
        remainingTime,
        status,
        isMuted,
        playTone,
        startRecording,
        stopRecording: cleanup,
        formatTime,
    };
}
