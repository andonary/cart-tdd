import {Product} from "../models/business/product";
import {ProductReferenceRepository} from "../../infra/repository/productReference.repository";

export class GenerateUniqueProductUseCase {
    constructor(private productReferenceRepository: ProductReferenceRepository) {
    }

    execute(product?: {name: string}) {
        let _product = product
        if (!_product) _product = this.productReferenceRepository.retrieveOne();
        return new Product(_product);
    }
}
