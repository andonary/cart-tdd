// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import {ValueObject} from "../tactic/valueObject";

export class UniqueId extends ValueObject {
    constructor(id?: string) {
        super();
        if (id && typeof id === 'string') {
            this.value = id;
        } else {
            this.value = uuidv4();
        }
    }

    getValue(): any {
        return super.getValue();
    }
}
