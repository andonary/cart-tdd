import { v4 as uuidv4 } from 'uuid';

export class UniqueId {
    private readonly id: string;

    constructor(id?: string) {
        this.id = id || uuidv4();
    }

    getId() {
        return this.id;
    }
}
