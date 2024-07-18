export enum WalletType {
    Metamask,
    WalletConnect,
    ThetaWallet
}

export enum AccountType {
    Google,
    Manual
}

export type AccountForm = {
    name: string | null,
    email: string | null,
    image: string | null;
};

export type Token = {
    tokenId: `0x${string}`;
    name: string;
    symbol: string;
    image: string;
};

export interface Notification {
    title: string;
    description: string;
    category: string;
    linkTitle?: string;
    linkUrl?: string;
}

export type React = {
    emoji: string;
    text: string;
    from: {
        name: string;
        image: string;
    };
    timestamp: Date;
};

export type Tip = {
    amount: string;
    text: string;
    from: {
        name: string;
        image: string;
    };
    timestamp: Date;
};

export type ReadableDate = {
    month: string;
    day: number;
    hour: number;
    min: number;
    year: number;
};

export type Account = {
    address: string;
    name: string;
    image: string | null;
    email: string;
    followers: Account[];
    channel: Channel | null;
    videos: Video[];
    streams: Stream[];
    created_at: Date;
};

export type Channel = {
    owner: Account;
    name: string;
    image: string;
    cover: string | null;
    created_at: Date;
};

export type Stream = {
    streamId: string;
    name: string;
    thumbnail: string;
    streamer: Account | string;
    playback_uri: string | null;
    player_uri: string | null;
    stream_server: string | null;
    stream_key: string | null;
    tx_hash: string | null;
    tips: boolean;
    viewers: Account[];
    exclusive: boolean;
    created_at: Date;
    start_at: Date;
};

export type Video = {
    videoId: string;
    name: string;
    thumbnail: string;
    streamer: Account | string;
    playback_uri: string | null;
    tips: boolean;
    viewers: Account[];
    views: number;
    exclusive: boolean;
    created_at: Date;
};

export type Paged<T> = {
    total: number,
    lastPage: number;
    data?: T;
    extra?: string;
};

export type CreatedStream = {
    id: string;
    name: string;
    status: string;
    update_time: Date;
    playback_uri: string | null;
    player_uri: string | null;
};

export type StartedStream = {
    stream_server: string;
    stream_key: string;
};

export type Chat = {
    channelId: string,
    text: string;
    from: {
        name: string;
        image: string | null;
    };
    timestamp: Date;
};