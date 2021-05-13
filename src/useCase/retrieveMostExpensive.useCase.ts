import {Product} from "../models/product";
import {Cart} from "../models/cart";

export function retrieveMostExpensive(cart: Cart): Promise<Product> {
    if (!cart.getAll().length) throw new Error();
    return Promise.resolve(cart.retrieveMostExpensive());
}
