import { generatePassword } from '../../core/passwordService.js';

describe('Тестирование passwordService (generatePassword)', () => {
    test('Должен генерировать пароль строго заданной длины', () => {
        const length = 15;
        const selectedTypes = ['lowercase', 'uppercase', 'numbers', 'symbols'];
        
        const password = generatePassword(length, selectedTypes);
        
        expect(password).toHaveLength(length);
    });

    test('Должен выбрасывать ошибку, если массив выбранных типов пуст', () => {
        const length = 10;
        const selectedTypes = [];
        
        expect(() => {
            generatePassword(length, selectedTypes);
        }).toThrow();
    });
});
