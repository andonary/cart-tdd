export interface Repository<T> {
    retrieveOne(): Promise<T>
}
