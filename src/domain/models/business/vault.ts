import {Product} from "./product";
import {Aggregate} from "../tactic/aggregate";

export class Vault extends Aggregate<Product[]> {
    constructor(private listProducts: Product[] = []) {
        super();
    }

    getAll(): Product[] {
        return this.listProducts;
    }

    retrieveMostExpensive(): Product {
        const _vault = this.listProducts;
        _vault.sort((a, b) => {
            if (b.isGreaterOrEqualsThan(a)) return 1;
            if (a.isGreaterOrEqualsThan(b)) return -1;
            return 0;
        });
        return _vault[0];
    }

    store(product: Product): void {
        this.listProducts.push(product);
    }
}
