/* eslint-disable prettier/prettier */

import * as ffmpeg from 'fluent-ffmpeg';
import { path } from '@ffmpeg-installer/ffmpeg';
import { PassThrough, Stream } from 'stream';

ffmpeg.setFfmpegPath(path);

const inputStream = new PassThrough();

export default class RtmpClient {
    constructor(rtmpUrl: string) {
        ffmpeg(inputStream)
            .inputFormat('webm')
            .videoCodec('libx264')
            .audioCodec('aac')
            .format('flv')
            .outputOptions([
                '-preset veryfast',
                '-tune zerolatency',
                '-pix_fmt yuv420p',
                '-movflags +faststart'
            ])
            .output(rtmpUrl)
            .on('start', () => {
                console.log('Streaming started');
            })
            .on('end', () => {
                console.log('Streaming finished');
            })
            .on('error', (err) => {
                console.error('Error: ' + err.message);
            })
            .run();
    }

    writeStream(stream: Stream) {
        inputStream.write(stream);
    }
}