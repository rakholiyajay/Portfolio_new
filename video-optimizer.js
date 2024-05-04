const { createFFmpeg } = require('@ffmpeg/ffmpeg');

async function optimizeVideo(inputPath, outputPath, options) {
    try {
        const ffmpeg = createFFmpeg({ log: true });
        await ffmpeg.load();

        ffmpeg.FS('writeFile', inputPath, await fetchFile(inputPath));

        await ffmpeg.run(
            '-i',
            inputPath,
            '-vcodec',
            'libx264', // Use a more efficient codec like H.264
            '-crf',
            '28', // Adjust the Constant Rate Factor (CRF) value for desired quality/size trade-off
            '-preset',
            'veryfast', // Use a faster encoding preset
            '-movflags',
            '+faststart', // Optimize for streaming
            outputPath
        );

        const optimizedData = ffmpeg.FS('readFile', outputPath);
        return optimizedData;
    } catch (error) {
        console.error('Error optimizing video:', error);
        throw error;
    }
}

async function fetchFile(filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}
