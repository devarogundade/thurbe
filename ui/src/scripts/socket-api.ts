import io, { Socket } from 'socket.io-client';
export default class SocketAPI {
    private socket: Socket;

    constructor() {
        this.socket = io(import.meta.env.VITE_BACKEND_URL, {
            autoConnect: true,
        });
    }

    on(event: string, callback: (data: any) => void) {
        this.socket.on(event, (data) => {
            callback(data);
        });
    }

    emit(event: string, data: any) {
        if (this.socket.connected) {
            this.socket.emit(event, data);
        }
    }

    disconnect() {
        if (this.socket.connected) {
            this.socket.disconnect();
        }
    }

    connected(): boolean {
        return this.socket.connected;
    }
}