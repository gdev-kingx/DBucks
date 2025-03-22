interface Window {
    webkitAudioContext: typeof AudioContext;
}

declare module 'web-audio-api' {
    export type AudioContext = globalThis.AudioContext;
    export type MediaStream = globalThis.MediaStream;
    export type AudioNode = globalThis.AudioNode;
    export type OscillatorNode = globalThis.OscillatorNode;
    export type GainNode = globalThis.GainNode;
    export type AnalyserNode = globalThis.AnalyserNode;
}
