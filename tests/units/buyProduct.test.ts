import {Vault} from "../../src/domain/models/business/vault";
import {Product} from "../../src/domain/models/business/product";
import {BuyProductUseCase} from "../../src/domain/useCase/buyProduct.useCase";
import {Wallet} from "../../src/domain/models/business/wallet";
import {ErrorMessage} from "../../src/domain/models/application/errorMessage";
import {MarketCap} from "../../src/domain/models/business/marketCap";

describe('TU: buy product', () => {
    let wallet: Wallet;
    let vault: Vault;
    let product: Product;
    let buyProductUseCase: BuyProductUseCase;
    let marketCap: MarketCap;

    const resetStates = () => {
        wallet = null;
        vault = new Vault();
        product = null;
        marketCap = new MarketCap([]);
        buyProductUseCase = new BuyProductUseCase();
    }

    beforeAll(() => {
        resetStates();
    });

    afterEach(() => {
        resetStates();
    });

    const buyProduct = () => {
        return buyProductUseCase.execute(product, vault, wallet, marketCap);
    };

    const expectBalanceChanged = (balance: number) => expect(wallet.retrieveBalance()).toEqual(balance);
    const expectProductInStore = (isStored = true) => {
        if (!isStored) expect(vault.getAll()).not.toContain(product);
        else expect(vault.getAll()).toContain(product);
    }

    test('Pour un produit de 0, avec un porte feuille de 0 je peux acheter le produit', async () => {
        // Arrange
        wallet = new Wallet({balance: 0});
        product = new Product({name: 'eau', price: 0});

        // Act
        await buyProduct();

        //Assert
        expectBalanceChanged(0);
        expectProductInStore();
    });

    test('Pour un produit de 100, avec un porte feuille de 0 je ne peux pas acheter le produit', async () => {
        // Arrange
        wallet = new Wallet({balance: 0});
        product = new Product({name: 'airtag', price: 100});

        // Act
        const message = await buyProduct();

        //Assert
        expect(message).toEqual(ErrorMessage.notEnoughMoney);
        expectBalanceChanged(0);
        expectProductInStore(false);
    });

    test('Pour un produit de 100, avec un porte feuille de 100 je peux acheter le produit et mon compte est débité', async () => {
        // Arrange
        wallet = new Wallet({balance: 100});
        product = new Product({name: 'airtag', price: 100});

        // Act
        await buyProduct();

        //Assert
        expectBalanceChanged(0);
        expectProductInStore();
    });

    test('Pour un produit présent sur la place de marché à 100, avec un porte feuille de 200 je peux acheter le produit et celui-ci est retiré de la place du marché', async () => {
        // Arrange
        wallet = new Wallet({balance: 200});
        product = new Product({name: 'airtag', price: 100});
        marketCap = new MarketCap([product]);
        expect(marketCap.retrieveAllProduct()).toContain(product);

        // Act
        await buyProduct();

        //Assert
        expectBalanceChanged(100);
        expectProductInStore();
        expect(marketCap.retrieveAllProduct()).not.toContain(product);
    });
});
