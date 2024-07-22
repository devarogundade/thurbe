export type Stream = {
    streamer: Account;
};

export type Account = {
    channel: Channel | null;
};

export type Channel = {
    name: string;
    image: string;
};