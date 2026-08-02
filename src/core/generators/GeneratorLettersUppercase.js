import { BaseGenerator } from '../BaseGenerator.js';
import { uppercaseLine } from '../constants/constants.js';

export class GeneratorLettersUppercase extends BaseGenerator { 
    constructor(length) {
        super(uppercaseLine, length);
    }
}