import { generatePassword } from '../../core/passwordService.js';
import { lowercaseLine, numbersLine } from '../../core/constants.js';

describe('Тестирование passwordService (generatePassword)', () => {
    
    test('Должен генерировать пароль строго заданной длины', () => {
        const length = 15;
        const selectedTypes = ['lowercase', 'uppercase', 'numbers', 'symbols'];
        
        const password = generatePassword(length, selectedTypes);
        
        expect(password).toHaveLength(length);
    });

    test('Должен содержать только символы из выбранных типов (например, только строчные и цифры)', () => {
        const length = 20;
        const selectedTypes = ['lowercase', 'numbers'];
        
        const password = generatePassword(length, selectedTypes);
        
        const allowedPool = lowercaseLine + numbersLine;
        
        for (const char of password) {
            expect(allowedPool.includes(char)).toBe(true);
        }
    });

    test('Должен выбрасывать ошибку, если массив выбранных типов пуст', () => {
        const length = 10;
        const selectedTypes = [];

        
        expect(() => {
            generatePassword(length, selectedTypes);
        }).toThrow();
    });
});
