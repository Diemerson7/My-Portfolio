// --- 1. ANIMAÇÃO DE REVELAR AO ROLAR (REVEAL) ---
const observerOptions = {
    threshold: 0.15 // Começa a animação quando 15% do elemento aparece
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// --- 2. LÓGICA DO BOTÃO DE CONTATO (BRILHO FORTE) ---
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');

function validateForm() {
    const isNameValid = nameInput.value.trim().length > 2;
    const isEmailValid = emailInput.value.includes('@') && emailInput.value.includes('.');
    const isMessageValid = messageInput.value.trim().length > 5;

    // Se tudo estiver preenchido, adiciona a classe que faz o botão brilhar
    if (isNameValid && isEmailValid && isMessageValid) {
        submitBtn.classList.add('ready');
    } else {
        submitBtn.classList.remove('ready');
    }
}

// Monitora a digitação em tempo real
if (nameInput) {
    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    messageInput.addEventListener('input', validateForm);
}

// Ação de envio simulada
submitBtn.addEventListener('click', () => {
    if (submitBtn.classList.contains('ready')) {
        submitBtn.innerText = "Enviando...";
        
        setTimeout(() => {
            alert("Mensagem enviada com sucesso! Diemerson entrará em contato.");
            submitBtn.innerText = "Enviar Mensagem";
            // Limpa os campos
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
            submitBtn.classList.remove('ready');
        }, 1500);
    }
});


// --- 3. SCROLL SUAVE (DESLIZE DO MENU) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});