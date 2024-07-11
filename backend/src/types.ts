/* eslint-disable prettier/prettier */

export type Paged<T> = {
    total: number,
    lastPage: number;
    data?: T;
    extra?: string;
};