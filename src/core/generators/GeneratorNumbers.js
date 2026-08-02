import { BaseGenerator } from "../BaseGenerator.js";
import { numbersLine } from "../constants/constants.js";

export class GeneratorNumbers extends BaseGenerator {
    constructor(length) {
        super(numbersLine, length);
    }
}