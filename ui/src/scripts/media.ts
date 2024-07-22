const Media = {
    // Function to enable or disable screen sharing
    async screenShare(): Promise<MediaStream | null> {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            // Use the stream (e.g., attach it to a video element or send it over a peer connection)
            console.log("Screen sharing started");
            return screenStream;
        } catch (error) {
            console.error("Error starting screen sharing:", error);
            return null;
        }
    },

    // Function to enable or disable the camera
    async toggleCamera(): Promise<MediaStream | null> {
        try {
            const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
            // Use the stream (e.g., attach it to a video element or send it over a peer connection)
            console.log("Camera enabled");
            return cameraStream;
        } catch (error) {
            console.error("Error enabling camera:", error);
            return null;
        }
    },

    // Function to enable or disable the microphone
    async microphone(): Promise<MediaStream | null> {
        try {
            const microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // Use the stream (e.g., attach it to an audio element or send it over a peer connection)
            console.log("Microphone enabled");
            return microphoneStream;
        } catch (error) {
            console.error("Error enabling microphone:", error);
            return null;
        }
    },

    async closeStream(stream: MediaStream) {
        stream.getTracks().forEach(track => track.stop());
    }
};

export default Media;