import { generatePassword } from "../../index.js";

describe('Тестирование функции generatePassword', () => {

    test('Должен возвращать строку правильной длины', () => {
        expect(generatePassword(8)).toHaveLength(8);
        expect(generatePassword(12)).toHaveLength(12);
        expect(generatePassword(20)).toHaveLength(20);
    });

    test('Должен возвращать пустую строку при длине 0', () => {
        expect(generatePassword(0)).toBe('');
    });

    test('Пароль должен содержать только разрешенные символы (латиница и цифры)', () => {
        const password = generatePassword(50);
        
        const allowedRegex = /^[A-Za-z0-9]+$/;
        
        expect(allowedRegex.test(password)).toBe(true);
    });

    test('Функция должна возвращать разные пароли при повторных вызовах', () => {
        const pass1 = generatePassword(12);
        const pass2 = generatePassword(12);
        
        expect(pass1).not.toBe(pass2);
    });

});