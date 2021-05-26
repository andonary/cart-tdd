import {RetrieveMostExpensiveUseCase} from "../../src/useCase/retrieveMostExpensive.useCase";

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
            expect(e).toBeDefined();
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

    test('Pour un panier contenant deux articles, le plus cher est retourné', async () => {
        // Arrange
        const macBookPro = retriever.createProduct({name: 'MacBookPro', price: 3000});
        const chromeBook = retriever.createProduct({name: 'Asus ChromeBook', price: 500});
        retriever.fillCart();

        // Act
        const mostExpensive = await retriever.execute();

        // Assert
        expect(mostExpensive).toEqual(macBookPro);
    });
});
