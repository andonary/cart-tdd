import {retrieveMostExpensive} from "../../src/useCase/retrieveMostExpensive.useCase";
import {Product} from "../../src/models/product";

describe('TU: retrieveMostExpensive', () => {
    test('Pour un panier vide, je suis averti que cela ne marche pas', () => {
        try {
            retrieveMostExpensive([]);
            fail();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    const testProductionCode = async (cart: Product[], mostExpensive: Product) => {
        const _mostExpensive: Product = await retrieveMostExpensive(cart);
        expect(_mostExpensive).toEqual(mostExpensive);
    }

    test('Pour un panier contenant un seul article, celui-ci est retourné', async () => {
        const playstation5: Product = new Product({name: 'PS5', price: 400});
        const cart: Product[] = [playstation5];
        await testProductionCode(cart, playstation5);
    });

    test('Pour un panier contenant deux articles, le plus cher est retourné', async () => {
        const macBookPro: Product = new Product({name: 'MacBookPro', price: 3000});
        const chromeBook: Product = new Product({name: 'Asus ChromeBook', price: 500});
        const cart: Product[] = [chromeBook, macBookPro];
        await testProductionCode(cart, macBookPro);
    });
});
