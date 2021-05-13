import {Product} from "../models/product";

export function retrieveMostExpensive(cart: Product[]): Promise<Product> {
    if (!cart.length) throw new Error();
    cart.sort((a, b) => b.price - a.price);
    return Promise.resolve(cart[0]);
}
