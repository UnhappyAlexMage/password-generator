import { generatePassword } from "./passwordService.js";

export function handleGenerateClick() {
    const passwordResultInput = document.getElementById('passwordResult');
    const passwordLengthInput = document.getElementById('passwordLength');

    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedTypes = Array.from(checkedBoxes).map(box => box.dataset.type);

    if (selectedTypes.length === 0) {
        passwordResultInput.value = "Выберите хотя бы один пункт!";
        return;
    };

    const length = parseInt(passwordLengthInput.value, 10);
    const newPassword = generatePassword(length, selectedTypes);
    
    passwordResultInput.value = newPassword;
};