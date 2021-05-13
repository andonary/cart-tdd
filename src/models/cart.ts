import {Product} from "./product";
import {Aggregate} from "./core/aggregate";

export class Cart implements Aggregate<Product> {
    constructor(private listProducts: Product[] = []) {
    }

    getAll(): Product[] {
        return this.listProducts;
    }

    retrieveMostExpensive(): Product {
        const _cart = this.listProducts;
        _cart.sort((a, b) => {
            if (b.isGreaterOrEqualsThan(a)) return 1;
            if (a.isGreaterOrEqualsThan(b)) return -1;
            return 0;
        });
        return _cart[0];
    }
}
