import {Money} from "./money";
import {Aggregate} from "../tactic/aggregate";

interface ProductProps {
    id: string;
    name: string;
    price: number;
}

export class Product extends Aggregate<Product> {
    readonly name: string;
    readonly price: Money;

    constructor(newProduct: Partial<ProductProps>) {
        super(newProduct.id);
        this.name = newProduct.name;
        this.price = new Money(newProduct.price);
    }

    isGreaterOrEqualsThan(product: Product): boolean {
        return this.price.isGreaterOrEqualsThan(product.price);
    }

    retrieveName() {
        return this.name;
    }
}
