import {Product} from "./product";

export class MarketCap {
    private readonly listProduct: Product[] = [];

    constructor(products: Product[]) {
        this.listProduct = products;
    }

    retrieveAllProduct() {
        return this.listProduct;
    }

    remove(product: Product) {
        const productIndex = this.listProduct.findIndex(p => p.equals(product));
        this.listProduct.splice(productIndex, 1);
    }
}
