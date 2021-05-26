import {Product} from "../models/product";
import {Cart} from "../models/cart";

export class RetrieveMostExpensiveUseCase {
    private cart: Cart;
    private listProduct: Product[] = [];

    constructor() {
    }

    createProduct(product: {name: string, price: number}): Product {
        const _newProduct = new Product(product);
        this.listProduct.push(_newProduct);
        return _newProduct;
    }

    fillCart() {
        this.cart = new Cart(this.listProduct);
    }

    async execute(): Promise<Product> {
        if (!this.cart.getAll().length) throw new Error();
        return Promise.resolve(this.cart.retrieveMostExpensive());
    }
}
