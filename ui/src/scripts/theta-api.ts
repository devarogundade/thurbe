import type { CreatedStream, StartedStream } from '@/types';
import axios from 'axios';

const client = axios.create({
    baseURL: 'https://api.thetavideoapi.com',
    headers: {
        'x-tva-sa-id': import.meta.env.VITE_THETA_ID,
        'x-tva-sa-secret': import.meta.env.VITE_THETA_SECRET,
        'Content-Type': 'application/json'
    }
});

const ThetaAPI = {
    async getVideoUrl(id: string): Promise<string | null> {
        try {
            const response = await client.get(`/video/${id}`);
            return response.data.body.videos[0].playback_uri;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async getStreamUrl(id: string): Promise<string | null> {
        try {
            const response = await client.get(`/stream/${id}`);
            return response.data.body.playback_uri;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async uploadVideo(
        name: string,
        file: File,
        nft_collection?: string,
    ): Promise<Object | null> {
        try {
            const createURL = await client.post(`/upload`);

            const data = createURL.data.body.uploads[0];

            await axios.put(data.presigned_url, file, {
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            });

            const options = nft_collection ? {
                "source_upload_id": data.id,
                "playback_policy": "public",
                nft_collection,
                "metadata": {
                    name
                }
            } : {
                "source_upload_id": data.id,
                "playback_policy": "public",
                "metadata": {
                    name
                }
            };

            const transcodeResponse = await client.post(`/video`, options);

            return transcodeResponse.data.body.videos[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async createStream(
        name: string
    ): Promise<CreatedStream | null> {
        try {
            const response = await client.post('/stream', {
                name
            });

            return response.data.body as CreatedStream;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    async startStream(
        id: string
    ): Promise<StartedStream | null> {
        try {
            const listIngestorsResponse = await client.get('/ingestor/filter');
            if (listIngestorsResponse.data.body.ingestors.length > 0) {
                const ingestor = listIngestorsResponse.data.body.ingestors[0].id;

                const selectIngestorsResponse = await client.put(`/ingestor/${ingestor}/select`, {
                    tva_stream: id
                });

                return {
                    id,
                    ...selectIngestorsResponse.data.body
                } as StartedStream;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};

export default ThetaAPI;