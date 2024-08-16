export type FetchData<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
}