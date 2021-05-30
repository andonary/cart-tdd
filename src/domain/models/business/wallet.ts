export class Wallet {
    private balance: number;

    constructor(wallet: { balance: number }) {
        this.balance = wallet.balance;
    }

    retrieveBalance(): number {
        return this.balance;
    }

    spend(amount: number): void {
        this.balance -= amount;
    }
}
