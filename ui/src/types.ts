export enum WalletType {
    Metamask,
    WalletConnect,
    ThetaWallet
}

export enum AccountType {
    Google,
    Manual
}

export enum ViewerType {
    Everyone,
    Follower,
    SuperFollower
}

export enum StreamType {
    Direct,
    External
}

export type AccountForm = {
    name: string | null,
    email: string | null,
    image: string | null;
};

export type VideoForm = {
    file: File | undefined;
    name: string | undefined;
    description: string | null;
    thumbnail: File | undefined;
    thumbnail_file_url: string | undefined;
    file_url: string | undefined;
    viewerType: ViewerType;
    tips: boolean;
};

export type StreamForm = {
    name: string | undefined;
    description: string | null;
    thumbnail: File | undefined;
    thumbnail_file_url: string | undefined;
    viewerType: ViewerType;
    streamType: StreamType;
    tips: boolean;
    start_at: Date;
};

export type ChannelForm = {
    cover_file: File | undefined;
    image_file: File | undefined;
    name: string | undefined;
    cover_file_url: string | undefined;
    image_file_url: string | undefined;
    super_amount: number | undefined;
    super_follow: boolean;
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
    from: {
        name: string;
        address: string;
        image: string | null;
    };
    timestamp: Date;
};

export type Tip = {
    amount: string;
    from: {
        name: string;
        address: string;
        image: string | null;
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
    followers: string[] | Account[];
    channel: Channel | null;
    videos: Video[];
    streams: Stream[];
    created_at: Date;
};

export type Channel = {
    owner: Account | string;
    name: string;
    image: string;
    cover: string | null;
    created_at: Date;
};

export type Stream = {
    streamId: string;
    name: string;
    description: string | null,
    thumbnail: string;
    streamer: Account | string;
    thetaId: string | null;
    stream_server: string | null;
    stream_key: string | null;
    tips: boolean;
    viewers: Account[];
    likes: string[];
    dislikes: string[];
    viewerType: ViewerType;
    streamType: StreamType;
    created_at: Date;
    start_at: Date;
    live: boolean;
};

export type Video = {
    videoId: string;
    name: string;
    description: string | null,
    thumbnail: string;
    streamer: Account | string;
    thetaId: string | null;
    tips: boolean;
    viewers: Account[];
    views: number;
    likes: string[];
    dislikes: string[];
    viewerType: ViewerType;
    created_at: Date;
};

export type Paged<T> = {
    total: number,
    lastPage: number;
    data?: T;
    extra?: string;
};

export type CreatedStream = {
    stream_server: string;
    stream_key: string;
    id: string;
    name: string;
    status: string;
    update_time: Date;
    playback_uri: string | null;
    player_uri: string | null;
};

export type StartedStream = {
    id: string;
    stream_server: string;
    stream_key: string;
};

export type Chat = {
    channelId: string,
    text: string;
    from: {
        name: string;
        address: string;
        image: string | null;
    };
    tip: {
        amount: number;
    },
    timestamp: Date;
};

export type Revenue = {
    createdAt: bigint;
    totalClaimedTfuel: bigint;
    totalClaimedThurbe: bigint;
    totalUnClaimedTfuel: bigint;
    totalUnClaimedThurbe: bigint;
};