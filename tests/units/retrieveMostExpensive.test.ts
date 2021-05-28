import {RetrieveMostExpensiveUseCase} from "../../src/useCase/retrieveMostExpensive.useCase";
import {ErrorMessage} from "../../src/models/application/errorMessage";

describe('TU: retrieveMostExpensive', () => {
    let retriever;

    beforeEach(() => {
        retriever = new RetrieveMostExpensiveUseCase();
    });

    test('Pour un panier vide, je suis averti que cela ne marche pas', async () => {
        try {
            await retriever.execute();
            fail();
        } catch (e) {
            expect(e.message).toEqual(ErrorMessage.cartEmpty);
        }
    });

    test('Pour un panier contenant un seul article, celui-ci est retourné', async () => {
        // Arrange
        const playstation5 = retriever.createProduct({name: 'PS5', price: 400});
        retriever.fillCart();

        // Act
        const mostExpensive = await retriever.execute();

        // Assert
        expect(mostExpensive).toEqual(playstation5);
    });

    test('Pour un panier contenant plusieurs articles, le plus cher est retourné', async () => {
        // Arrange
        const chromeBook = retriever.createProduct({name: 'Asus ChromeBook', price: 500});
        const macBookPro = retriever.createProduct({name: 'MacBookPro', price: 3000});
        const piano = retriever.createProduct({name: 'Yamaha Piano', price: 1500});
        const figurine = retriever.createProduct({name: 'Rare figurine', price: 1500});
        retriever.fillCart();

        // Act
        const mostExpensive = await retriever.execute();

        // Assert
        expect(mostExpensive).toEqual(macBookPro);
    });
});
