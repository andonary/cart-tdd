import {Money} from "./money";

interface ProductProps {
    name: string;
    price: number;
}

export class Product {
    readonly name: string;
    readonly price: Money;

    constructor(newProduct: Partial<ProductProps>) {
        this.name = newProduct.name;
        this.price = new Money(newProduct.price);
    }

    isGreaterOrEqualsThan(product: Product): boolean {
        return this.price.isGreaterOrEqualsThan(product.price);
    }

    getPrice(): string {
        return this.price.getPrice();
    }
}
