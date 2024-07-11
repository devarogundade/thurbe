import type { CreatedStream, StartedStream } from '@/types';
import axios from 'axios';

const thetaApi = axios.create({
    baseURL: 'https://api.thetavideoapi.com',
    headers: {
        'x-tva-sa-id': import.meta.env.THETA_ID,
        'x-tva-sa-secret': import.meta.env.THETA_SECRET,
        'Content-Type': 'application/json'
    }
});

export async function uploadVideo(
    name: string,
    fileContents: any,
    // nft_collection: string,
): Promise<string | null> {
    try {
        const createURL = await thetaApi.post(`/upload`);

        const data = createURL.data.body.uploads[0];

        await thetaApi.put(createURL.data.presigned_url, fileContents);

        const options = {
            "source_upload_id": data.id,
            "playback_policy": "public",
            // nft_collection,
            "metadata": {
                name
            }
        };

        const transcodeResponse = await thetaApi.post(`/video`, options);

        return transcodeResponse.data.body.videos[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createStream(
    description: string
): Promise<CreatedStream | null> {
    try {
        const response = await thetaApi.post('/stream', {
            name: description
        });

        return response.data.body as CreatedStream;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function startStream(
    thetaStreamId: string
): Promise<StartedStream | null> {
    try {
        const listIngestorsResponse = await thetaApi.get('/ingestor/filter');
        const ingestor = listIngestorsResponse.data.body.ingestors[0].id;

        const selectIngestorsResponse = await thetaApi.put(`/ingestor/${ingestor}/select`, {
            tva_stream: thetaStreamId
        });

        return selectIngestorsResponse.data.body as StartedStream;
    } catch (error) {
        console.error(error);
        return null;
    }
}