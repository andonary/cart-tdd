import {Product} from "../models/business/product";
import {Vault} from "../models/business/vault";
import {Exception} from "../models/application/exception";
import {ErrorMessage} from "../models/application/errorMessage";

export class RetrieveMostExpensiveUseCase {
    constructor() {
    }

    async execute(vault: Vault): Promise<Product> {
        if (!vault.getAll().length) throw new Exception(ErrorMessage.cartEmpty);
        return Promise.resolve(vault.retrieveMostExpensive());
    }
}
