import {RetrieveMostExpensiveUseCase} from "../../src/useCase/retrieveMostExpensive.useCase";

describe(`Scénario: Je souhaite extraire le produit le plus cher de mon panier`, () => {
    test('Pour un panier contenant plusieurs produit, je retrouve le produit le plus cher', async () => {
        // Arrange
        const retriever = new RetrieveMostExpensiveUseCase();
        retriever.createProduct({name: 'house', price: 50});
        retriever.createProduct({name: 'cable', price: 29});
        const iphone = retriever.createProduct({name: 'iphone', price: 1200});
        retriever.fillCart();

        // Act
        const mostExpensive = await retriever.execute();

        // Assert
        expect(mostExpensive).toEqual(iphone);
    });
});
