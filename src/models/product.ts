export class Product {
    readonly name: string;
    readonly price: number;

    constructor(newProduct: Partial<Product>) {
        Object.assign(this, newProduct);
    }
}
