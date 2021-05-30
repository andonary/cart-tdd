import {Product} from "../models/business/product";
import {Vault} from "../models/business/vault";
import {Wallet} from "../models/business/wallet";
import {ErrorMessage} from "../models/application/errorMessage";
import {MarketCap} from "../models/business/marketCap";

export class BuyProductUseCase {
    async execute(product: Product, vault: Vault, wallet: Wallet, marketCap: MarketCap): Promise<void | string> {
        const balance = wallet.retrieveBalance();
        const price = product.retrievePrice();
        if (balance >= price) {
            wallet.spend(price);
            vault.store(product);
            marketCap.remove(product);
        }
        else return ErrorMessage.notEnoughMoney;
    }
}
