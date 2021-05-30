import {RandomProductReferenceProvider} from "../../domain/services/randomProductReferenceProvider";
import {Repository} from "../../domain/ports/repository";
import {ProductReference} from "../../domain/models/business/productReference";

export class InMemoryProductReferenceRepository implements Repository<ProductReference> {
    private listProductReference: ProductReference[];
    private randomCalculator: RandomProductReferenceProvider;

    constructor(randomProductReferenceProvider: RandomProductReferenceProvider) {
        this.randomCalculator = randomProductReferenceProvider;
    }

    retrieveOne(): Promise<ProductReference> {
        const random: number = this.randomCalculator.generate(this.listProductReference.length);
        return Promise.resolve(this.listProductReference[random]);
    }

    feedWith(listProductReference: ProductReference[]) {
        this.listProductReference = listProductReference;
    }
}
