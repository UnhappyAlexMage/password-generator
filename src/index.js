import { FactoryGenerator } from './core/FactoryGenerator.js';

const letterGen = FactoryGenerator.createGenerator('lowercase', 4)
// console.log(letterGen.generateLineSymbols())

const letterGen1 = FactoryGenerator.createGenerator('uppercase', 4)
// console.log(letterGen1.generateLineSymbols())

const letterGen2 = FactoryGenerator.createGenerator('numbers', 4)
// console.log(letterGen2.generateLineSymbols())

const letterGen3 = FactoryGenerator.createGenerator('symbols', 4)
// console.log(letterGen3.generateLineSymbols())

export function generatePassword(length) {
    // 1. Собираем результаты всех генераторов в одну общую строку.
    // Получится строка длиной 16 символов (например, "abcdABCD1234!@#$")
    const allGeneratedSymbols = 
        letterGen.generateLineSymbols() +
        letterGen1.generateLineSymbols() +
        letterGen2.generateLineSymbols() +
        letterGen3.generateLineSymbols();

    // 2. Превращаем строку в массив отдельных символов: ['a', 'b', 'c', ...]
    const symbolsArray = allGeneratedSymbols.split('');

    let password = '';
    
    // 3. В цикле случайно вытаскиваем символы из этого массива
    for (let i = 0; i < length; i++) {
        // Если символы в пуле закончились, выходим из цикла
        if (symbolsArray.length === 0) break;

        // Выбираем случайный индекс из оставшихся элементов массива
        const randomIndex = Math.floor(Math.random() * symbolsArray.length);
        
        // Забираем символ и ОДНОВРЕМЕННО удаляем его из массива (через splice),
        // чтобы один и тот же символ не повторялся дважды, если пул маленький
        const randomChar = symbolsArray.splice(randomIndex, 1)[0];

        // Добавляем чистый символ к паролю (без всяких String.fromCharCode)
        password += randomChar;
    }

    return password;
}

console.log(generatePassword(8));
console.log(generatePassword(12));
