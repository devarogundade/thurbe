import axios from "axios";

const client = axios.create({
    baseURL: import.meta.env.VITE_STABLE_AI_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STABLE_AI_KEY}`,
        Accept: "image/*"
    }
});

const StableAI = {
    async generate(prompt: string): Promise<ArrayBuffer | null> {
        try {
            const payload = {
                prompt: `Generate a video thumbnail for: ${prompt}`,
                output_format: "webp",
                aspect_ratio: "16:9"
            };

            const data = axios.toFormData(payload, new FormData());

            const response = await client.post('stable-image/generate/ultra', data, {
                validateStatus: undefined,
                responseType: "arraybuffer",
            });

            if (response.status === 200) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};

export default StableAI;