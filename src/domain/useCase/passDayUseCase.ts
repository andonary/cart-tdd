import {Vault} from "../models/business/vault";

export class PassDayUseCase {
    async execute(vault: Vault, numberOfDaysToPass: number) {
        if (numberOfDaysToPass > 0) {
            const allProducts = vault.getAll();
            allProducts.forEach(product => {
                for (let i = 0; i < numberOfDaysToPass; i++) {
                    product.priceChange();
                }
            });
        }
    }
}
