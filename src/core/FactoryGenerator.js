import { GeneratorLettersLowercase } from './generators/GeneratorLettersLowercase.js';
import { GeneratorLettersUppercase } from './generators/GeneratorLettersUppercase.js';
import { GeneratorNumbers } from './generators/GeneratorNumbers.js';
import { GeneratorSymbols } from './generators/GeneratorSymbols.js';

export class FactoryGenerator {
    static createGenerator(type, length) { 
        switch (type) { 
            case 'lowercase': return new GeneratorLettersLowercase(length);
            case 'uppercase': return new GeneratorLettersUppercase(length);
            case 'numbers': return new GeneratorNumbers(length);
            case 'symbols': return new GeneratorSymbols(length);

            default: throw new Error(`Неизвестный тип: ${type}`)
        }
    }
}