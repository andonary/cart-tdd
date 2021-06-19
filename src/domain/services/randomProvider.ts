export class RandomProvider {
    private unique: number = null;

    nextUnique(): void {
        if (this.unique === null) this.unique = 0;
        else this.unique++;
    }

    generate(max: number, min = 0): number {
        if (this.unique !== null) return this.unique;
        return Math.floor(Math.random() * max) + min;
    }
}
