import { FactoryGenerator } from './core/FactoryGenerator.js';

const letterGen = FactoryGenerator.createGenerator('lowercase', 5)
console.log(letterGen.generateLineSymbols())