import {Product} from "../../src/domain/models/business/product";
import {GenerateUniqueProductUseCase} from "../../src/domain/useCase/generateUniqueProduct.useCase";
import {InMemoryProductReferenceRepository} from "../../src/infra/repository/inMemoryProductReferenceRepository";
import {RandomProductReferenceProvider} from "../../src/domain/services/randomProductReferenceProvider";
import {ProductReference} from "../../src/domain/models/business/productReference";

describe('TU: generate unique product', () => {
    let generator: GenerateUniqueProductUseCase;
    let repository: InMemoryProductReferenceRepository;
    let randomProvider: RandomProductReferenceProvider;

    beforeEach(() => {
        randomProvider = new RandomProductReferenceProvider()
        repository = new InMemoryProductReferenceRepository(randomProvider);
        generator = new GenerateUniqueProductUseCase(repository);
    });

    test('Lorsque je génère un produit gameboy, celui-ci existe et porte le nom gameboy', async () => {
        // Arrange

        // Act
        const product: Product = await generator.execute({name: 'gameboy'});

        // Assert
        expect(product.retrieveName()).toEqual('gameboy')
    });

    test('Lorsque je génère deux produits gameboy, les deux me sont retourné et ne sont pas identifié comme étant le même produit', async () => {
        // Arrange

        // Act
        const productOne: Product = await generator.execute({name: 'gameboy'});
        const productTwo: Product = await generator.execute({name: 'gameboy'});

        // Assert
        expect(productOne.equals(productTwo)).toBeFalsy();
    });

    test('Lorsque je génère un produit sans input, celui-ci est généré à partir de ma liste de produit de référence contenant seulement un ipad', async () => {
        // Arrange
        const listProductReference = [
            new ProductReference({name: 'ipad'})
        ];
        repository.feedWith(listProductReference);

        // Act
        const product: Product = await generator.execute();

        // Assert
        expect(product.retrieveName()).toEqual('ipad');
    });

    test('Lorsque je génère un produit sans input, celui-ci est généré à partir de ma liste de produit de référence contenant seulement un amazon echo', async () => {
        // Arrange
        const listProductReference = [
            new ProductReference({name: 'amazon echo'})
        ];
        repository.feedWith(listProductReference);

        // Act
        const product: Product = await generator.execute();

        // Assert
        expect(product.retrieveName()).toEqual('amazon echo');
    });

    test('Lorsque je génère un produit sans input, celui-ci est généré aléatoirement à partir de ma liste de produit de référence contenant un ipad et un gameboy', async () => {
        // Arrange
        const listProductReference = [
            new ProductReference({name: 'ipad'}),
            new ProductReference({name: 'gameboy'})
        ];
        repository.feedWith(listProductReference);

        // Act
        randomProvider.nextUnique();
        const productOne: Product = await generator.execute();
        randomProvider.nextUnique();
        const productTwo: Product = await generator.execute();

        // Assert
        expect(productOne.retrieveName()).toMatch(/ipad|gameboy/);
        expect(productTwo.retrieveName()).toMatch(/ipad|gameboy/);
        expect(productOne.retrieveName()).not.toEqual(productTwo.retrieveName());
    });
});
