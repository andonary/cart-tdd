export class RandomProductReferenceProvider {
    private unique: number = null;

    nextUnique() {
        if (this.unique === null) this.unique = 0;
        else this.unique++;
    }

    generate(max: number): number {
        if (this.unique !== null) return this.unique;
        return Math.floor(Math.random() * max);
    }
}
