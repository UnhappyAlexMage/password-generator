const form = document.querySelector('.form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const undoBtn = document.getElementById('undoBtn');

function showError(input, message) {
    removeError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    input.parentElement.appendChild(errorDiv);
    input.style.borderColor = 'red';
}

function removeError(input) {
    const error = input.parentElement.querySelector('.error');
    if (error) {
        error.remove();
    }
    input.style.borderColor = '';
}

function checkName(value) {
    if (value.trim() === '') {
        return 'Поле "Full Name" обязательно для заполнения';
    }
    return '';
}

function checkEmail(value) {
    if (value.trim() === '') {
        return 'Поле "Email" обязательно для заполнения';
    }
    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailPattern.test(value)) {
        return 'Введите корректный email (например: name@mail.com)';
    }
    
    return '';
}

function checkPhone(value) {
    if (value.trim() === '') {
        return 'Поле "Phone Number" обязательно для заполнения';
    }
    
    const cleanNumber = value.replace(/[\s\-\(\)]/g, '');
    const phonePattern = /^\+?\d{10,15}$/;
    
    if (!phonePattern.test(cleanNumber)) {
        return 'Введите корректный телефон (10-15 цифр, можно с +)';
    }
    
    return '';
}

let history = [{ username: '', email: '', phone: '' }];
let historyIndex = 0;
let isUndoing = false;

function saveState() {
    if (isUndoing) return;
    
    history = history.slice(0, historyIndex + 1);
    
    history.push({
        username: usernameInput.value,
        email: emailInput.value,
        phone: phoneInput.value
    });
    historyIndex++;
}

function undo() {
    if (historyIndex === 0) return;
    
    isUndoing = true;
    historyIndex--;
    
    const prev = history[historyIndex];
    usernameInput.value = prev.username;
    emailInput.value = prev.email;
    phoneInput.value = prev.phone;
    
    removeError(usernameInput);
    removeError(emailInput);
    removeError(phoneInput);
    
    isUndoing = false;
}


function validateForm(event) {
    event.preventDefault();
    
    const nameError = checkName(usernameInput.value);
    const emailError = checkEmail(emailInput.value);
    const phoneError = checkPhone(phoneInput.value);
    
    let isValid = true;
    
    if (nameError) {
        showError(usernameInput, nameError);
        isValid = false;
    } else {
        removeError(usernameInput);
    }
    
    if (emailError) {
        showError(emailInput, emailError);
        isValid = false;
    } else {
        removeError(emailInput);
    }
    
    if (phoneError) {
        showError(phoneInput, phoneError);
        isValid = false;
    } else {
        removeError(phoneInput);
    }
    
    if (isValid) {
        alert('✅ Форма успешно отправлена!');
        form.reset();
        saveState();
    }
}

history[0] = {
    username: usernameInput.value,
    email: emailInput.value,
    phone: phoneInput.value
};

[usernameInput, emailInput, phoneInput].forEach(input => {
    input.addEventListener('input', () => !isUndoing && saveState());
});

form.addEventListener('submit', validateForm);

undoBtn.addEventListener('click', undo);

usernameInput.addEventListener('input', function() {
    if (checkName(this.value) === '') {
        removeError(this);
    }
});

emailInput.addEventListener('input', function() {
    if (checkEmail(this.value) === '') {
        removeError(this);
    }
});

phoneInput.addEventListener('input', function() {
    if (checkPhone(this.value) === '') {
        removeError(this);
    }
});