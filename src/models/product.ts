export interface IProduct {
    price: number;
    name: string
}

export class Product implements IProduct {
    name: string;
    price: number;

    constructor(newProduct: Partial<IProduct>) {
        Object.assign(this, newProduct);
    }
}
