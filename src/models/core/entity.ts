import {UniqueId} from "./uniqueId";

export abstract class Entity<T> {
    protected readonly id: UniqueId;

    constructor(id?: string) {
        this.id = new UniqueId(id);
    }
}
