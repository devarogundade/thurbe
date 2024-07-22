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
        const { streamId, started } = job.data;

        const stream: Stream = await this.streamModel.findOne({
            streamId
        }).exec();

        const streamer: Account = await this.accountModel.findOne({
            address: stream.streamer
        }).populate(['followers', 'channel']).exec();

        if (streamer.followers.length == 0 || !streamer.channel) {
            return;
        }

        const subject: string = `${streamer.name} from Thurbe.`;

        const message: string = started ?
            `<p><b>${streamer.channel.name}</b> is starting a live stream now.</p>
            <br /> <br />
            <p style="font-size: 18px;">Title: ${stream.name}</p>
            <br /> <br />
            <a href="https://thurbe.xyz/streams/${streamId}">
                <button style="width: 100%; height: 40px; color: #FFF; background: rgba(24, 48, 40, 1); border: none;">
                    Watch live
                </button>
            </a>
            ` :
            `<p>${streamer.channel.name} is starting a live stream at ${stream.start_at}</p>
            <br /> <br />
            <p style="font-size: 18px;">Title: ${stream.name}</p>
            <br /> <br />
            <a href="https://thurbe.xyz/streams/${streamId}">
                <button style="width: 100%; height: 40px; color: #FFF; background: rgba(24, 48, 40, 1); border: none;">
                    More detail
                </button>
            </a>
            `;

        for (let index = 0; index < streamer.followers.length; index++) {
            const viewerEmail = streamer.followers[index].email;
            if (viewerEmail) this.sendMail(viewerEmail, subject, message);
        }
    }

    private async sendMail(
        to: string,
        subject: string,
        html: string
    ) {
        const transporter = createTransport({
            service: 'gmail',
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