import {UniqueId} from "../application/uniqueId";

export abstract class Entity<T> {
    protected readonly id: UniqueId;

    constructor(id?: string) {
        this.id = new UniqueId(id);
    }

    equals(otherEntity: Entity<T>): boolean {
        return this.id === otherEntity.id;
    }
}
