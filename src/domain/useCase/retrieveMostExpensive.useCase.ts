import {Product} from "../models/business/product";
import {Vault} from "../models/business/vault";
import {Exception} from "../models/application/exception";
import {ErrorMessage} from "../models/application/errorMessage";

export class RetrieveMostExpensiveUseCase {
    private vault: Vault = new Vault();
    private listProduct: Product[] = [];

    constructor() {
    }

    createProduct(product: {name: string, price: number}): Product {
        const _newProduct = new Product(product);
        this.listProduct.push(_newProduct);
        return _newProduct;
    }

    fillVault() {
        this.vault = new Vault(this.listProduct);
    }

    async execute(): Promise<Product> {
        if (!this.vault.getAll().length) throw new Exception(ErrorMessage.cartEmpty);
        return Promise.resolve(this.vault.retrieveMostExpensive());
    }
}
