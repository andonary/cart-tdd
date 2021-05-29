export abstract class ValueObject {
    protected value: any;

    protected isGreaterOrEqualsThan(vo: this): boolean {
        throw new Error('Not Implemented Yet! 🚧🚧🚧');
    }

    protected getValue() {
        return this.value;
    }
}
