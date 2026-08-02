import { BaseGenerator } from '../BaseGenerator.js';
import { symbolsLine } from '../constants/constants.js';

export class GeneratorSymbols extends BaseGenerator { 
    constructor(length) {
        super(symbolsLine, length);
    }
}