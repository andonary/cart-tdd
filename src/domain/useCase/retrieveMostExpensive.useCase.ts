import {Product} from "../models/business/product";
import {Vault} from "../models/business/vault";
import {ErrorMessage} from "../models/application/errorMessage";

export class RetrieveMostExpensiveUseCase {
    constructor() {
    }

    async execute(vault: Vault): Promise<Product | string> {
        if (!vault.getAll().length) return Promise.resolve(ErrorMessage.cartEmpty);
        return Promise.resolve(vault.retrieveMostExpensive());
    }
}
