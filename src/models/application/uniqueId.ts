import { v4 as uuidv4 } from 'uuid';
import {ValueObject} from "../tactic/valueObject";

export class UniqueId extends ValueObject {
    private readonly id: string;

    constructor(id?: string) {
        super();
        this.id = id || uuidv4();
    }
}