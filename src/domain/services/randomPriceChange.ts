import {RandomProvider} from "./randomProvider";

export class RandomPriceChange {
    private static instance: RandomPriceChange;
    public static variation: number;
    private isUniqueVariation: boolean;

    private constructor() {
    }

    public getRandomValue() {
        if (!RandomPriceChange.variation) {
            this.setRandomVariation();
        }
        const variation = RandomPriceChange.variation;
        if (!this.isUniqueVariation) RandomPriceChange.variation = null;
        return variation;
    }

    public static getInstance() {
        if (!RandomPriceChange.instance) {
            RandomPriceChange.instance = new RandomPriceChange();
        }
        return RandomPriceChange.instance;
    }

    public setRandomVariation(variation?: number) {
        if (variation) RandomPriceChange.variation = variation;
        else {
            const random = new RandomProvider().generate(2, 1);
            const sign = new RandomProvider().generate(2, 1) === 1 ? 1 : -1;
            RandomPriceChange.variation = sign * random;
        }
    }

    public static resetSingleton() {
        RandomPriceChange.instance = null;
    }

    public setVariationUnique() {
        this.isUniqueVariation = true;
    }
}
