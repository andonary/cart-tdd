import {RetrieveMostExpensiveUseCase} from "../../src/domain/useCase/retrieveMostExpensive.useCase";
import {ErrorMessage} from "../../src/domain/models/application/errorMessage";
import {VaultService} from "../../src/domain/services/vaultService";

describe('TU: retrieveMostExpensive', () => {
    let retriever: RetrieveMostExpensiveUseCase;
    let vaultService: VaultService;

    beforeEach(() => {
        retriever = new RetrieveMostExpensiveUseCase();
        vaultService = new VaultService();
    });

    test('Pour un panier vide, je suis averti que cela ne marche pas', async () => {
        // Arrange
        const vault = vaultService.retrieveVault();

        // Act
        const message = await retriever.execute(vault);

        // Assert
        expect(message).toEqual(ErrorMessage.cartEmpty);
    });

    test('Pour un panier contenant un seul article, celui-ci est retourné', async () => {
        // Arrange
        const playstation5 = vaultService.createProduct({name: 'PS5', price: 400});
        vaultService.fillVault();
        const vault = vaultService.retrieveVault();

        // Act
        const mostExpensive = await retriever.execute(vault);

        // Assert
        expect(mostExpensive).toEqual(playstation5);
    });

    test('Pour un panier contenant plusieurs articles, le plus cher est retourné', async () => {
        // Arrange
        const chromeBook = vaultService.createProduct({name: 'Asus ChromeBook', price: 500});
        const macBookPro = vaultService.createProduct({name: 'MacBookPro', price: 3000});
        const piano = vaultService.createProduct({name: 'Yamaha Piano', price: 1500});
        const figurine = vaultService.createProduct({name: 'Rare figurine', price: 1500});
        vaultService.fillVault();
        const vault = vaultService.retrieveVault();

        // Act
        const mostExpensive = await retriever.execute(vault);

        // Assert
        expect(mostExpensive).toEqual(macBookPro);
    });
});
