import {Product} from "./product";

export class MarketCap {
    private readonly listProduct: Product[] = [];

    constructor(products: Product[]) {
        this.listProduct = products;
    }

    retrieveAllProduct(): Product[] {
        return this.listProduct;
    }

    remove(product: Product): void {
        const productIndex = this.listProduct.findIndex(p => p.equals(product));
        this.listProduct.splice(productIndex, 1);
    }
}
