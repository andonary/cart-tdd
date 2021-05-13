import {ValueObject} from "./core/valueObject";

export class Money implements ValueObject {
    private readonly amount: number;
    private readonly currency: string;

    constructor(price: number, currency: string = 'EUR') {
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
