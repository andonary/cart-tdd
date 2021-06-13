import {Product} from "../../domain/models/business/product";
import {Vault} from "../../domain/models/business/vault";
import {PassDayUseCase} from "../../domain/useCase/passDayUseCase";
import {RandomPriceChange} from "../../domain/services/randomPriceChange";

describe('TU: passing days', () => {
    let vault: Vault;
    let collectorMetalGearSolid: Product;
    let passDay: PassDayUseCase;

    beforeAll(() => {
        RandomPriceChange.resetSingleton();
        vault = new Vault();
        passDay = new PassDayUseCase();
    });

    afterEach(() => {
        RandomPriceChange.resetSingleton();
        vault = new Vault();
        passDay = new PassDayUseCase();
    });

    const getPriceOfMyCollector = (priceToFixed: number) => {
        collectorMetalGearSolid = new Product({name: 'collector mgs', price: priceToFixed});
        vault.store(collectorMetalGearSolid);
        return collectorMetalGearSolid.retrievePrice();
    };

    const setRandomVariation = (randomVariation?: number): number => {
        const singleton = RandomPriceChange.getInstance();
        if (randomVariation) {
            singleton.setRandomVariation(randomVariation);
            return randomVariation;
        }
        return RandomPriceChange.variation ?? NaN;
    };

    const setRandomVariationUnique = () => {
        const singleton = RandomPriceChange.getInstance();
        singleton.setVariationUnique();
    };

    const passingDay = (number: number) => passDay.execute(vault, number);

    test('Un produit présent dans mon coffre jour 1 valant 300, son prix reste à 300 jour 1', async () => {
        // Arrange
        const price = getPriceOfMyCollector(300);

        // Act
        await passingDay(0);

        //Assert
        expect(price).toEqual(collectorMetalGearSolid.retrievePrice());
    });

    test('Un produit présent dans mon coffre jour 1 valant 300, voit son prix varie de +10 jour 2', async () => {
        // Arrange
        const price = getPriceOfMyCollector(300);
        const randomVariation = setRandomVariation(10);

        // Act
        await passingDay(1);

        //Assert
        expect(price).not.toEqual(collectorMetalGearSolid.retrievePrice());
        expect(collectorMetalGearSolid.retrievePrice()).toEqual(price + randomVariation);
    });

    test('Un produit présent dans mon coffre jour 1 valant 1, ne peut voir son prix descendre à zéro jour 2', async () => {
        // Arrange
        getPriceOfMyCollector(1);
        setRandomVariation(-1);

        // Act
        await passingDay(1);

        //Assert
        expect(collectorMetalGearSolid.retrievePrice()).toBeGreaterThan(0);
    });

    test('Un produit présent dans mon coffre jour 1, connait une variation chaque jour', async () => {
        // Arrange
        const price = getPriceOfMyCollector(300);
        const randomVariation = setRandomVariation(10);
        setRandomVariationUnique();

        // Act
        await passingDay(2);

        //Assert
        expect(collectorMetalGearSolid.retrievePrice()).toEqual(price + 2 * randomVariation);
    });

    test('Un produit présent dans mon coffre jour 1, connait une variation différente chaque jour', async () => {
        // Arrange
        const price = getPriceOfMyCollector(300);
        const randomVariation = setRandomVariation(10);

        // Act
        await passingDay(2);

        //Assert
        expect(collectorMetalGearSolid.retrievePrice()).not.toEqual(price + randomVariation);
        expect(collectorMetalGearSolid.retrievePrice()).not.toEqual(price + 2 * randomVariation);
    });
});
