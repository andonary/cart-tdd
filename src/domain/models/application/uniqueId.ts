import { v4 as uuidv4 } from 'uuid';
import {ValueObject} from "../tactic/valueObject";

export class UniqueId extends ValueObject {
    private readonly id: string;

    constructor(id?: string) {
        super();
        if (id && typeof id === 'string') {
            this.id = id;
        } else {
            this.id = uuidv4();
        }
    }

    getId(): string {
        return this.id;
    }
}
