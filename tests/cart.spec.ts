import {retrieveMostExpensive} from "../src/useCase/retrieveMostExpensive.useCase";
import {IProduct, Product} from "../src/models/product";

describe(`Scénario: Je souhaite extraire le produit le plus cher de mon panier`, () => {
    const cart: IProduct[] = [
        new Product({name: 'house', price: 50}),
        new Product({name: 'cable', price: 29}),
        new Product({name: 'iphone', price: 1200})
    ];
    let mostExpensive: IProduct;

    test('Given: Pour un panier donné', () => {
        expect(cart.length).toEqual(3);
    });

    test(`When: j'action le vérificateur de prix le plus cher`, async () => {
        mostExpensive = await retrieveMostExpensive(cart);
    });

    test('Then: je retrouve le produit le plus cher de mon panier', () => {
        expect(mostExpensive?.price).toEqual(1200);
    });
});
