import {Product} from "../models/business/product";
import {Vault} from "../models/business/vault";

export class VaultService {
    private vault: Vault = new Vault();
    private listProduct: Product[] = [];

    createProduct(product: {name: string, price: number}): Product {
        const _newProduct = new Product(product);
        this.listProduct.push(_newProduct);
        return _newProduct;
    }

    fillVault(): void {
        this.vault = new Vault(this.listProduct);
    }

    retrieveVault(): Vault {
        return this.vault;
    }
}
