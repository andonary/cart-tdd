import {ErrorMessage} from "../errorMessage";

export class Exception extends Error {
    constructor(message: string = ErrorMessage.unknownError) {
        super(message);
    }
}
