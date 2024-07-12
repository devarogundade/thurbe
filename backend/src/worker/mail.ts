/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bullmq';
import { Model } from 'mongoose';
import { Account } from 'src/database/schemas/account';
import { Stream } from 'src/database/schemas/stream';
import { createTransport } from 'nodemailer';
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Processor('MailWorker')
export class MailWorker extends WorkerHost {

    constructor(
        @InjectModel(Stream.name) private streamModel: Model<Stream>,
        @InjectModel(Account.name) private accountModel: Model<Account>,
    ) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const date = new Date();
        date.setTime(Date.now() - (5 * 60 * 1000));

        const streams: Stream[] = await this.streamModel.find({
            mailSent: false,
            start_at: { $lte: date }
        }).exec();

        console.log('worker', streams);

        for (let index = 0; index < streams.length; index++) {
            const stream = streams[index];

            const streamer: Account = await this.accountModel.findOne({
                address: stream.streamer
            }).exec();

            for (let index = 0; index < streamer.followers.length; index++) {
                this.sendMail(
                    streamer.followers[index].email,
                    `Livestream notification.`,
                    `${streamer.name} is starting a live stream at ${stream.start_at}`
                );
            }
        }
    }

    private async sendMail(
        to: string,
        subject: string,
        html: string
    ) {
        const transporter = createTransport({
            secure: true,
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        transporter.sendMail({
            from: process.env.FROM_EMAIL, to, subject, html
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }, (error: Error | null, _: SMTPTransport.SentMessageInfo) => {
            if (error) {
                console.error(error);
                return;
            }
        });
    }

    @OnWorkerEvent('completed')
    onCompleted() { }
}