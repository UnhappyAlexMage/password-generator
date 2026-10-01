import { FactoryGenerator } from './FactoryGenerator.js';

export function generatePassword(length, selectedTypes) {
    if(!selectedTypes || selectedTypes.length === 0) {
        throw new Error('Необходимо выбрать хотя бы один тип символов');
    }

    const baseLength = Math.floor(length / selectedTypes.length);
    const remainder = length % selectedTypes.length;

    let allGeneratedSymbols = '';
    selectedTypes.forEach((type, index) => {
        const currentLength = index === 0 ? baseLength + remainder : baseLength;
        const generator = FactoryGenerator.createGenerator(type, currentLength);
        allGeneratedSymbols += generator.generateLineSymbols();
    })

    const symbolsArray = allGeneratedSymbols.split('');
    let result = '';

    while (symbolsArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * symbolsArray.length);
        const randomChar = symbolsArray.splice(randomIndex, 1)[0];
        result += randomChar;
    }

    return result;
};