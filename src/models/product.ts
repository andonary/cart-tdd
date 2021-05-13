export class Product {
    name: string;
    price: number;

    constructor(newProduct: Partial<Product>) {
        Object.assign(this, newProduct);
    }
}
