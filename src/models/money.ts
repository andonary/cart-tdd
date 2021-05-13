import {ValueObject} from "./core/valueObject";
import {Currency} from "./currency";

export class Money implements ValueObject {
    private readonly amount: number;
    private readonly currency: string;

    constructor(price: number, currency: Currency = Currency.euro) {
        this.amount = price;
        this.currency = currency;
    }

    isGreaterOrEqualsThan(money: Money): boolean {
        return this.amount > money.amount;
    }

    getPrice(): string {
        return this.amount + ' ' + this.currency;
    }
}
