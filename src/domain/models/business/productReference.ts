import {Aggregate} from "../tactic/aggregate";

interface ProductReferenceProps {
    id?: string;
    name: string;
}

export class ProductReference extends Aggregate<ProductReference> {
    readonly name: string;

    constructor(newProduct: ProductReferenceProps) {
        super(newProduct.id);
        this.name = newProduct.name;
    }
}
