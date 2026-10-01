import { BaseGenerator } from '../../core/BaseGenerator.js';

describe('Тестирование BaseGenerator', () => {
    test('Должен возвращать строку строго заданной длины', () => {
        const alphabet = 'ABC';
        const targetLength = 1;
        const generator = new BaseGenerator(alphabet, targetLength);

        const result = generator.generateLineSymbols();

        expect(result).toHaveLength(targetLength);
    });
});
