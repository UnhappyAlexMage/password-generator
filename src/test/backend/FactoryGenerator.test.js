import { FactoryGenerator } from '../../core/FactoryGenerator.js';
import { GeneratorNumbers } from '../../core/generators/GeneratorNumbers.js';
import { GeneratorLettersLowercase } from '../../core/generators/GeneratorLettersLowercase.js';

describe('Тестирование FactoryGenerator', () => {
    test('Должен успешно создавать генератор чисел с правильным классом', () => {
        const generator = FactoryGenerator.createGenerator('numbers', 5);
        
        expect(generator).toBeInstanceOf(GeneratorNumbers);
        expect(generator.length).toBe(5);
    });

    test('Должен успешно создавать генератор строчных букв', () => {
        const generator = FactoryGenerator.createGenerator('lowercase', 10);
        expect(generator).toBeInstanceOf(GeneratorLettersLowercase);
    });

    test('Должен выбрасывать понятную ошибку при передаче неизвестного типа', () => {
        expect(() => {
            FactoryGenerator.createGenerator('unknown-type', 8);
        }).toThrow('Неизвестный тип: unknown-type');
    });
});
