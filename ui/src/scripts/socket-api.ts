import io, { Socket } from 'socket.io-client';
export default class SocketAPI {
    private socket: Socket;

    constructor(url: string) {
        this.socket = io(url);

        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });
    }

    on(event: string, callback: (data: any) => void) {
        if (this.socket.connected) {
            this.socket.on(event, callback);
        }
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