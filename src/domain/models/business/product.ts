import {Money} from "./money";
import {Aggregate} from "../tactic/aggregate";
import {RandomPriceChange} from "../../services/randomPriceChange";

interface ProductProps {
    id: string;
    name: string;
    price: number;
}

export class Product extends Aggregate<Product> {
    private readonly name: string;
    private price: Money;

    constructor(newProduct: Partial<ProductProps>) {
        super(newProduct.id);
        this.name = newProduct.name;
        this.price = new Money(newProduct.price);
    }

    isGreaterOrEqualsThan(product: Product): boolean {
        return this.price.isGreaterOrEqualsThan(product.price);
    }

    retrieveName(): string {
        return this.name;
    }

    retrievePrice(): number {
        return this.price.retrieveAmount();
    }

    priceChange() {
        const randomPriceValue = RandomPriceChange.getInstance();
        const price = new Money(this.price.retrieveAmount() + randomPriceValue.getRandomValue());
        if (price.retrieveAmount() > 0) this.price = price;
    }
}
