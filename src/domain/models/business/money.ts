import {ValueObject} from "../tactic/valueObject";
import {Currency} from "./currency";

export class Money extends ValueObject {
    private readonly amount: number;
    private readonly currency: Currency;

    constructor(price: number, currency: Currency = Currency.euro) {
        super();
        this.amount = price;
        this.currency = currency;
    }

    isGreaterOrEqualsThan(money: Money): boolean {
        return this.amount > money.amount;
    }

    retrieveAmount() {
        return this.amount;
    }
}
