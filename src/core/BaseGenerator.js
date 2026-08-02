export class BaseGenerator {
    constructor(lineSymbols, length) {
        this.lineSymbols = lineSymbols;
        this.length = length;
    }

    generateLineSymbols() {
        let result = '';
        for(let i = 0; i < this.length; i++) {
            const randomIndex = Math.floor(Math.random() * this.lineSymbols.length);
            result += this.lineSymbols[randomIndex];
        }
        return result;
    }
};
