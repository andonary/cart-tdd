import {retrieveMostExpensive} from "../../src/useCase/retrieveMostExpensive.useCase";
import {Product} from "../../src/models/product";
import {Cart} from "../../src/models/cart";
import {Money} from "../../src/models/money";

describe(`Scénario: Je souhaite extraire le produit le plus cher de mon panier`, () => {
    const cart: Cart = new Cart([
        new Product({name: 'house', price: 50}),
        new Product({name: 'cable', price: 29}),
        new Product({name: 'iphone', price: 1200})
    ]);
    let mostExpensive: Product;

    test('Given: Pour un panier donné', () => {
        expect(cart.getAll().length).toEqual(3);
    });

    test(`When: j'action le vérificateur de prix le plus cher`, async () => {
        mostExpensive = await retrieveMostExpensive(cart);
    });

    test('Then: je retrouve le produit le plus cher de mon panier', () => {
        expect(mostExpensive?.getPrice()).toEqual(new Money(1200).getPrice());
    });
});
