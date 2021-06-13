import { v4 as uuidv4 } from 'uuid';
import {ValueObject} from "../tactic/valueObject";

export class UniqueId extends ValueObject {
    constructor(id?: string) {
        super();
        this.value = id || uuidv4();
    }

    getValue(): any {
        return super.getValue();
    }
}
