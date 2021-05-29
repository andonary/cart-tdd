import {RandomProductReferenceProvider} from "../provider/randomProductReference.provider";

export class ProductReferenceRepository {
    private listProductReference: { name: string }[] = [];
    private randomCalculator: RandomProductReferenceProvider;

    constructor(randomProductReferenceProvider: RandomProductReferenceProvider) {
        this.randomCalculator = randomProductReferenceProvider;
    }

    retrieveOne() {
        const random: number = this.randomCalculator.generate(this.listProductReference.length);
        return this.listProductReference[random];
    }

    feedWith(listProductReference: { name: string }[]) {
        this.listProductReference = listProductReference;
    }

    setRandomCalculator(randomProductReferenceProvider: RandomProductReferenceProvider) {
        this.randomCalculator = randomProductReferenceProvider;
    }
}
