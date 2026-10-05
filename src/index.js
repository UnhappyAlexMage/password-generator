import { handleGenerateClick } from "./core/handleGenerateClick.js";

function updateLengthView() {
    const passwordLengthInput = document.getElementById('passwordLength');
    const lengthValueSpan = document.getElementById('lengthValue');
    
    if (passwordLengthInput && lengthValueSpan) {
        lengthValueSpan.textContent = passwordLengthInput.value;
    }
};

export function handleCopyClick() {
    if (!this.value) return;

    this.select();
    this.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(this.value);

    const originalValue = this.value;
    this.value = ''; 
    this.placeholder = 'Скопировано! 👍';
    this.classList.add('copied');

    setTimeout(() => {
        this.value = originalValue;
        this.placeholder = 'Ваш результат';
        this.classList.remove('copied');
        this.blur();
    }, 1500);
}

export function initDOMHandler() {
    const passwordLengthInput = document.getElementById('passwordLength');
    const generateButton = document.getElementById('generate-btn');
    const passwordResultInput = document.getElementById('passwordResult');

    if (!passwordLengthInput || !generateButton) return;

    passwordLengthInput.addEventListener('input', updateLengthView);
    generateButton.addEventListener('click', handleGenerateClick);

    if (passwordResultInput) {
        passwordResultInput.addEventListener('click', handleCopyClick);
    }
};

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initDOMHandler);
};

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA Service Worker зарегистрирован!', reg))
            .catch(err => console.error('Ошибка регистрации Service Worker', err))
    })
};