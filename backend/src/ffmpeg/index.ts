/* eslint-disable prettier/prettier */

import ffmpeg from 'fluent-ffmpeg';

export function startFFmpeg(url: string, signal: any) {
    const ffmpegProcess = ffmpeg()
        .addInput('pipe:0')
        .inputFormat('webm')
        .videoCodec('libx264')
        .audioCodec('aac')
        .format('flv')
        .output(url)
        .on('start', (commandLine) => {
            console.log('Spawned FFmpeg with command: ' + commandLine);
        })
        .on('error', (err, stdout, stderr) => {
            console.log('Error: ' + err.message);
            console.log('FFmpeg stderr: ' + stderr);
        });

    const { stdin } = ffmpegProcess;

    stdin.write(signal.sdp);
}