import { BaseGenerator } from "../BaseGenerator.js";
import { lowercaseLine } from "../constants/constants.js";

export class GeneratorLettersLowercase extends BaseGenerator {
    constructor(length) {
        super(lowercaseLine, length);
    }
}