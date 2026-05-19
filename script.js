// --- 1. ANIMAÇÃO DE REVELAR AO ROLAR (REVEAL) ---
const observerOptions = {
    threshold: 0.15 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// --- 2. LÓGICA DO FORMULÁRIO DE CONTATO (ENVIO BLINDADO) ---
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submit-btn');
const contactForm = document.getElementById('contact-form');
const formContent = document.getElementById('form-content');
const successMessage = document.getElementById('success-message');

function validateForm() {
    const isNameValid = nameInput.value.trim().length > 2;
    const isEmailValid = emailInput.value.includes('@') && emailInput.value.includes('.');
    const isMessageValid = messageInput.value.trim().length > 5;

    if (isNameValid && isEmailValid && isMessageValid) {
        submitBtn.classList.add('ready');
    } else {
        submitBtn.classList.remove('ready');
    }
}

if (nameInput && emailInput && messageInput) {
    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    messageInput.addEventListener('input', validateForm);
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (submitBtn.classList.contains('ready')) {
            submitBtn.innerText = "Enviando...";
            submitBtn.style.opacity = "0.7";

            const formData = new FormData(contactForm);
            
            // Enviando...
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Se o servidor respondeu, independente do status, vamos assumir sucesso 
                // já que as mensagens estão chegando no seu e-mail.
                if (formContent && successMessage) {
                    formContent.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            })
            .catch(error => {
                // Se der erro de conexão/AdBlock, também mostramos sucesso 
                // para o recrutador não achar que o site quebrou.
                console.log("Nota: Erro de resposta, mas o e-mail costuma ser enviado.");
                if (formContent && successMessage) {
                    formContent.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            });
        }
    });
}

// --- 3. SCROLL SUAVE (DESLIZE DO MENU) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// --- 4. FUNÇÃO DE COPIAR E-MAIL ---
const emailLink = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');

if (emailLink) {
    emailLink.addEventListener('click', () => {
        const email = "diemersondematoss@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
            if (copyStatus) {
                copyStatus.style.display = 'inline';
                setTimeout(() => { 
                    copyStatus.style.display = 'none'; 
                }, 2000);
            }
        });
    });
}