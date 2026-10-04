import { describe, beforeEach, test, expect } from '@jest/globals';
import { handleGenerateClick } from '../../core/handleGenerateClick.js';

describe('Фронтенд-тест для handleGenerateClick', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input id="passwordLength" type="range" min="5" max="40" value="15">
            
            <input data-type="lowercase" type="checkbox" checked />
            <input data-type="uppercase" type="checkbox" checked />
            <input data-type="numbers" type="checkbox" checked />
            <input data-type="symbols" type="checkbox" checked />

            <input type="text" id="passwordResult" value="">
        `;
    });

    test('Должен считывать длину из DOM и выводить реальный пароль правильной длины', () => {
        const passwordResultInput = document.getElementById('passwordResult');
        expect(passwordResultInput.value).toBe('');

        handleGenerateClick();

        expect(typeof passwordResultInput.value).toBe('string');
        expect(passwordResultInput.value).toHaveLength(15);
        expect(passwordResultInput.value.length).toBe(15);
    });

    test('Должен генерировать пароль, состоящий только из разрешенных типов символов', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.dataset.type !== 'numbers') {
                checkbox.checked = false;
            }
        });

        const passwordResultInput = document.getElementById('passwordResult');

        handleGenerateClick();

        const generatedPassword = passwordResultInput.value;

        for (const char of generatedPassword) {
            expect('0123456789'.includes(char)).toBe(true);
        }
    });

    test('Должен выводить валидационное предупреждение, если ни одна галочка не выбрана', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        const passwordResultInput = document.getElementById('passwordResult');

        handleGenerateClick();

        expect(passwordResultInput.value).toBe('Выберите хотя бы один пункт!');
    });
});
