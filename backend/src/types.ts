/* eslint-disable prettier/prettier */

export type Paged<T> = {
    total: number,
    lastPage: number;
    data?: T;
    extra?: string;
};

export enum ViewerType {
    Everyone,
    Follower,
    SuperFollower
}

export enum StreamType {
    Direct,
    External
}
