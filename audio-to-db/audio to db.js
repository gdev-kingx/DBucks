const fs = require('fs');
const { exec } = require('child_process');
const Microphone = require('node-microphone');

// Audio settings
const SAMPLE_RATE = 44100; // Hz
const CHUNK_DURATION = 2;  // Seconds to record
const REFERENCE = 0.00002; // 20 micropascals (dB SPL reference)

// Generate a tone and save it to a WAV file
function generateTone(frequency = 440, duration = 2, amplitude = 0.5) {
    const numSamples = Math.floor(SAMPLE_RATE * duration);
    const buffer = Buffer.alloc(44 + numSamples * 2); // 44 bytes for WAV header + 2 bytes per sample

    // Write WAV header
    buffer.write('RIFF', 0);
    buffer.writeUInt32LE(36 + numSamples * 2, 4); // File size - 8
    buffer.write('WAVE', 8);
    buffer.write('fmt ', 12);
    buffer.writeUInt32LE(16, 16); // Format chunk size
    buffer.writeUInt16LE(1, 20); // Audio format (PCM)
    buffer.writeUInt16LE(1, 22); // Number of channels
    buffer.writeUInt32LE(SAMPLE_RATE, 24); // Sample rate
    buffer.writeUInt32LE(SAMPLE_RATE * 2, 28); // Byte rate
    buffer.writeUInt16LE(2, 32); // Block align
    buffer.writeUInt16LE(16, 34); // Bits per sample
    buffer.write('data', 36);
    buffer.writeUInt32LE(numSamples * 2, 40); // Data chunk size

    // Generate sine wave
    for (let i = 0; i < numSamples; i++) {
        const sample = Math.sin(2 * Math.PI * frequency * i / SAMPLE_RATE) * amplitude * 32767;
        buffer.writeInt16LE(Math.floor(sample), 44 + i * 2);
    }

    // Save to file
    fs.writeFileSync('tone.wav', buffer);
    console.log('Generated tone.wav');
}

// Function to play the tone using Windows Media Player
function playTone() {
    console.log("Playing tone...");
    return new Promise((resolve, reject) => {
        const command = `powershell -c "(New-Object Media.SoundPlayer 'tone.wav').PlaySync()"`;
        exec(command, (err) => {
            if (err) {
                console.error('Error playing tone:', err);
                reject(err);
            } else {
                console.log('Tone played successfully');
                resolve();
            }
        });
    });
}

// Record audio from microphone
function recordAudio() {
    return new Promise((resolve, reject) => {
        const mic = new Microphone();
        const outputFile = fs.createWriteStream('recorded.raw');
        const chunks = [];
        
        console.log('Recording...');
        const micStream = mic.startRecording();
        
        micStream.on('data', (data) => {
            chunks.push(data);
            outputFile.write(data);
        });

        micStream.on('error', (error) => {
            console.error('Error recording:', error);
            mic.stopRecording();
            reject(error);
        });

        // Stop recording after CHUNK_DURATION seconds
        setTimeout(() => {
            mic.stopRecording();
            outputFile.end();
            console.log('Recording stopped');
            
            // Combine all chunks into a single buffer
            const audioBuffer = Buffer.concat(chunks);
            resolve(audioBuffer);
        }, CHUNK_DURATION * 1000);
    });
}

// Calculate decibels from raw audio data
function calculateDecibels(audioBuffer) {
    // Convert buffer to array of samples
    const samples = new Float32Array(audioBuffer.length / 2);
    for (let i = 0; i < audioBuffer.length; i += 2) {
        samples[i/2] = audioBuffer.readInt16LE(i) / 32768.0; // Normalize to [-1, 1]
    }

    // Calculate RMS (root mean square)
    const rms = Math.sqrt(samples.reduce((sum, sample) => sum + sample * sample, 0) / samples.length);
    
    // Calculate dB SPL
    const db = 20 * Math.log10(rms / REFERENCE);
    console.log(`Sound level: ${db.toFixed(2)} dB SPL`);
    return db;
}

// Main execution
async function main() {
    try {
        // Generate and play tone
        generateTone();
        await playTone();
        
        // Wait a moment before recording
        console.log('Get ready to record in 1 second...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Record and analyze
        const audioBuffer = await recordAudio();
        calculateDecibels(audioBuffer);
    } catch (err) {
        console.error('Error:', err);
    }
}

main();