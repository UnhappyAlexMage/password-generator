import { handleGenerateClick } from "./core/handleGenerateClick.js";

function updateLengthView() {
    const passwordLengthInput = document.getElementById('passwordLength');
    const lengthValueSpan = document.getElementById('lengthValue');
    
    if (passwordLengthInput && lengthValueSpan) {
        lengthValueSpan.textContent = passwordLengthInput.value;
    }
};

export function initDOMHandler() {
    const passwordLengthInput = document.getElementById('passwordLength');
    const generateButton = document.getElementById('generate-btn');

    if (!passwordLengthInput || !generateButton) return;

    passwordLengthInput.addEventListener('input', updateLengthView);
    generateButton.addEventListener('click', handleGenerateClick);
};

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initDOMHandler);
};