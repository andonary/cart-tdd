import {Product} from "../../src/domain/models/business/product";
import {GenerateUniqueProductUseCase} from "../../src/domain/useCase/generateUniqueProduct.useCase";
import {ProductReferenceRepository} from "../../src/infra/repository/productReference.repository";
import {RandomProductReferenceProvider} from "../../src/infra/provider/randomProductReference.provider";

describe('TU: generate unique product', () => {
    let generator: GenerateUniqueProductUseCase;
    let repository: ProductReferenceRepository;

    beforeEach(() => {
        repository = new ProductReferenceRepository(new RandomProductReferenceProvider());
        generator = new GenerateUniqueProductUseCase(repository);
    });

    test('Lorsque je génère un produit gameboy, celui-ci existe et porte le nom gameboy', () => {
        // Arrange

        // Act
        const product: Product = generator.execute({name: 'gameboy'});

        // Assert
        expect(product.name).toEqual('gameboy')
    });

    test('Lorsque je génère deux produits gameboy, les deux me sont retourné et ne sont pas identifié comme étant le même produit', () => {
        // Arrange

        // Act
        const productOne: Product = generator.execute({name: 'gameboy'});
        const productTwo: Product = generator.execute({name: 'gameboy'});

        // Assert
        expect(productOne.equals(productTwo)).toBeFalsy();
    });

    test('Lorsque je génère un produit sans input, celui-ci est généré à partir de ma liste de produit de référence contenant seulement un ipad', () => {
        // Arrange
        const listProductReference = [
            {name: 'ipad'}
        ];
        repository.feedWith(listProductReference);

        // Act
        const product: Product = generator.execute();

        // Assert
        expect(product.name).toEqual('ipad');
    });

    test('Lorsque je génère un produit sans input, celui-ci est généré à partir de ma liste de produit de référence contenant seulement un amazon echo', () => {
        // Arrange
        const listProductReference = [
            {name: 'amazon echo'}
        ];
        repository.feedWith(listProductReference);

        // Act
        const product: Product = generator.execute();

        // Assert
        expect(product.name).toEqual('amazon echo');
    });

    test('Lorsque je génère un produit sans input, celui-ci est généré aléatoirement à partir de ma liste de produit de référence contenant un ipad et un gameboy', () => {
        // Arrange
        const listProductReference = [
            {name: 'ipad'},
            {name: 'gameboy'}
        ];
        repository.feedWith(listProductReference);
        const randomProductReferenceProvider = new RandomProductReferenceProvider();
        repository.setRandomCalculator(randomProductReferenceProvider);

        // Act
        randomProductReferenceProvider.nextUnique();
        const productOne: Product = generator.execute();
        randomProductReferenceProvider.nextUnique();
        const productTwo: Product = generator.execute();

        // Assert
        expect(productOne.name).toMatch(/ipad|gameboy/);
        expect(productTwo.name).toMatch(/ipad|gameboy/);
        expect(productOne.name).not.toEqual(productTwo.name);
    });
});
