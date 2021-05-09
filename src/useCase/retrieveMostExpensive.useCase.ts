import {IProduct} from "../models/product";

export function retrieveMostExpensive(cart: IProduct[]): Promise<IProduct> {
    if (!cart.length) throw new Error();
    cart.sort((a, b) => b.price - a.price);
    return Promise.resolve(cart[0]);
}
