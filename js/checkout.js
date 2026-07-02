// ============================================
// EMAILJS — klucze w js/script.js (obiekt EMAILJS_CONFIG)
// Edytuj TYLKO w script.js — checkout.js czyta stamtąd
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicjalizacja EmailJS
    if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined' && EMAILJS_READY) {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }

    // Pobierz parametry z URL
    const params = new URLSearchParams(window.location.search);
    const scarfName  = params.get('scarf')  || 'Chusta Lekkość';
    const scarfType  = params.get('type')   || 'original';
    const scarfPrice = params.get('price')  || '450 PLN';

    // Podsumowanie zamówienia
    const summaryItem = document.getElementById('summaryItem');
    if (summaryItem) {
        summaryItem.innerHTML = `
            <p style="font-size:1rem;color:var(--umbra);margin-bottom:0.5rem;">${scarfName}</p>
            <p style="font-size:0.78rem;color:var(--beige-dark);letter-spacing:1px;text-transform:uppercase;margin-bottom:1.5rem;">
                ${scarfType === 'original' ? 'Original — Sygnowana' : 'Print — 1/50 szt.'}
            </p>
            <p style="font-size:1.6rem;font-weight:300;color:var(--umbra);letter-spacing:1px;">${scarfPrice}</p>
            <p style="font-size:0.78rem;color:var(--beige-dark);margin-top:1.5rem;line-height:1.7;font-style:italic;">
                Płatność przelewem lub BLIK-iem.<br>
                Dane do przelewu wyślemy w ciągu 24h.
            </p>
        `;
    }

    // Dynamiczna cena na przycisku płatności (Stripe — na przyszłość)
    const payBtn = document.getElementById('payBtn');
    if (payBtn) payBtn.textContent = 'Zapłać ' + scarfPrice;

    // Breadcrumb — powrót do kolekcji
    const backLink = document.getElementById('backToCollections');
    if (backLink) backLink.href = 'collections.html';

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            document.getElementById(this.dataset.tab + '-tab').classList.add('active');
            if (this.dataset.tab === 'payment' && !window.stripeInitialized) {
                initializeStripe();
            }
        });
    });

    // Email form
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!validateForm(this)) return;

            const btn = this.querySelector('.submit-checkout');
            const name  = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const notes = this.querySelector('textarea').value;

            btn.textContent = 'Wysyłanie...';
            btn.disabled = true;

            const success = await sendOrderEmail({ name, email, scarfName, scarfType, scarfPrice, notes });

            if (success) {
                btn.textContent = 'Wysłano ✓';
                setTimeout(() => { window.location.href = 'collections.html'; }, 2000);
            } else {
                btn.textContent = 'Błąd — spróbuj ponownie';
                btn.disabled = false;
            }
        });
    }

    // Payment form (Stripe — przyszłość)
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!validateForm(this)) return;
            if (window.stripe && window.cardElement) {
                const { token } = await window.stripe.createToken(window.cardElement);
                if (token) processStripePayment({ token: token.id, scarfName, scarfType, scarfPrice });
            }
        });
    }
});

// ============================================
// EMAILJS — wysyłanie zamówienia
// ============================================
async function sendOrderEmail({ name, email, scarfName, scarfType, scarfPrice, notes }) {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS nie jest załadowany');
        return false;
    }
    try {
        await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateOrder, {
            customer_name:  name,
            customer_email: email,
            scarf_name:     scarfName,
            scarf_type:     scarfType === 'original' ? 'Original — Sygnowana' : 'Print — 1/50 szt.',
            scarf_price:    scarfPrice,
            notes:          notes || '—',
            reply_to:       email,
        });
        return true;
    } catch (err) {
        console.error('EmailJS error:', err);
        return false;
    }
}

// ============================================
// WALIDACJA
// ============================================
function validateForm(form) {
    let valid = true;
    form.querySelectorAll('.form-field').forEach(field => {
        const input    = field.querySelector('input, textarea');
        const errorMsg = field.querySelector('.field-error-msg');
        if (!input) return;
        const value = input.value.trim();
        let error = '';
        if (input.hasAttribute('required') && !value) {
            error = 'To pole jest wymagane';
        } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Podaj prawidłowy adres email';
        } else if (input.type === 'tel' && value && !/^[+\d\s-]{7,}$/.test(value)) {
            error = 'Podaj prawidłowy numer telefonu';
        }
        if (error) {
            input.classList.add('field-error');
            if (errorMsg) { errorMsg.textContent = error; errorMsg.classList.add('visible'); }
            valid = false;
        } else {
            input.classList.remove('field-error');
            if (errorMsg) errorMsg.classList.remove('visible');
        }
    });
    const firstError = form.querySelector('.field-error');
    if (firstError) firstError.focus();
    return valid;
}

document.addEventListener('input', function(e) {
    if (e.target.classList.contains('field-error')) {
        e.target.classList.remove('field-error');
        const msg = e.target.closest('.form-field')?.querySelector('.field-error-msg');
        if (msg) msg.classList.remove('visible');
    }
});

// ============================================
// STRIPE (do aktywacji gdy będzie działalność)
// ============================================
function initializeStripe() {
    // Zastąp kluczem ze Stripe Dashboard po rejestracji działalności
    // window.stripe = Stripe('pk_live_TWOJ_KLUCZ');
    console.log('Stripe: uzupełnij klucz publiczny w checkout.js');
}

function processStripePayment(data) {
    fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(r => r.json())
    .then(result => {
        if (result.success) {
            alert('Płatność przyjęta. Dziękujemy!');
            window.location.href = 'collections.html';
        } else {
            alert('Błąd płatności. Spróbuj ponownie.');
        }
    })
    .catch(err => console.error('Stripe error:', err));
}
