import {retrieveMostExpensive} from "../../src/useCase/retrieveMostExpensive.useCase";
import {IProduct, Product} from "../../src/models/product";

describe('TU: retrieveMostExpensive', () => {
    test('Pour un panier vide, je suis averti que cela ne marche pas', () => {
        try {
            retrieveMostExpensive([]);
            fail();
        } catch (e) {
            expect(e).toBeDefined();
        }
    });

    const testProductionCode = async (cart: IProduct[], mostExpensive: IProduct) => {
        const _mostExpensive: IProduct = await retrieveMostExpensive(cart);
        expect(_mostExpensive).toEqual(mostExpensive);
    }

    test('Pour un panier contenant un seul article, celui-ci est retourné', async () => {
        const playstation5: IProduct = new Product({name: 'PS5', price: 400});
        const cart: IProduct[] = [playstation5];
        await testProductionCode(cart, playstation5);
    });

    test('Pour un panier contenant deux articles, le plus cher est retourné', async () => {
        const macBookPro: IProduct = new Product({name: 'MacBookPro', price: 3000});
        const chromeBook: IProduct = new Product({name: 'Asus ChromeBook', price: 500});
        const cart: IProduct[] = [chromeBook, macBookPro];
        await testProductionCode(cart, macBookPro);
    });
});
