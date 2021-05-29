import {Product} from "../models/business/product";
import {Repository} from "../ports/repository";
import {ProductReference} from "../models/business/productReference";

export class GenerateUniqueProductUseCase {
    constructor(private productReferenceRepository: Repository<ProductReference>) {
    }

    async execute(product?: {name: string}) {
        let _product = product
        if (!_product) _product = await this.productReferenceRepository.retrieveOne();
        return new Product(_product);
    }
}
