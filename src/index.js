export function generatePassword(length) {
    // 1. Создаем массив, куда соберем коды ВСЕХ разрешенных символов
    const allowedCodes = [];

    // Добавляем коды заглавных букв A-Z (65-90)
    for (let i = 65; i <= 90; i++) allowedCodes.push(i);

    // Добавляем коды строчных букв a-z (97-122)
    for (let i = 97; i <= 122; i++) allowedCodes.push(i);

    // Добавляем коды цифр 0-9 (48-57)
    for (let i = 48; i <= 57; i++) allowedCodes.push(i);

    const specialCodes = [];
    allowedCodes.push(...specialCodes);

    // 2. Генерируем саму строку пароля
    let password = '';
    
    for (let i = 0; i < length; i++) {
        // Выбираем случайный индекс из нашего огромного массива кодов
        const randomIndex = Math.floor(Math.random() * allowedCodes.length);
        const randomCode = allowedCodes[randomIndex];
        
        // Превращаем код в символ и добавляем к паролю
        password += String.fromCharCode(randomCode);
    }

    return password;
}

console.log(generatePassword(8));
console.log(generatePassword(12));
console.log(generatePassword(16));
