export class Wallet {
    private balance: number;

    constructor(wallet: { balance: number }) {
        this.balance = wallet.balance;
    }

    retrieveBalance() {
        return this.balance;
    }

    spend(amount: number) {
        this.balance -= amount;
    }
}
