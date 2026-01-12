export interface Log<T> {
    event: string;
    metadata?: T;
}