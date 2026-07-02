# Lekkość — Instrukcja Wdrożenia

## 1. EmailJS — konfiguracja (darmowy, bez backendu)

### Krok po kroku:

1. Wejdź na https://www.emailjs.com i załóż konto
2. Kliknij **Email Services** → Add New Service → wybierz Gmail lub Outlook
   - Autoryzuj swoje konto email
   - Zapisz **Service ID** (np. `service_abc123`)

3. Kliknij **Email Templates** → Create New Template
   - Stwórz szablon dla zamówień z polami:
     ```
     Od: {{customer_name}} <{{customer_email}}>
     Temat: Nowe zamówienie — {{scarf_name}}
     
     Zamówienie: {{scarf_name}}
     Typ: {{scarf_type}}
     Cena: {{scarf_price}}
     Uwagi: {{notes}}
     ```
   - Zapisz **Template ID** (np. `template_xyz456`)
   - Stwórz drugi szablon dla wiadomości kontaktowych (pola: from_name, from_email, message)

4. Wejdź w **Account** → API Keys → skopiuj **Public Key**

5. Uzupełnij klucze w dwóch plikach:

**js/checkout.js** — linie 8-10:
```javascript
const EMAILJS_PUBLIC_KEY     = 'TWOJ_PUBLIC_KEY';
const EMAILJS_SERVICE_ID     = 'TWOJ_SERVICE_ID';
const EMAILJS_TEMPLATE_ORDER = 'TWOJ_TEMPLATE_ID';
```

**js/script.js** — szukaj `EJS_PUBLIC_KEY`:
```javascript
const EJS_PUBLIC_KEY   = 'TWOJ_PUBLIC_KEY';
const EJS_SERVICE_ID   = 'TWOJ_SERVICE_ID';
const EJS_TEMPLATE_MSG = 'TWOJ_TEMPLATE_CONTACT_ID';
```

---

## 2. Hosting — gdzie wrzucić stronę (za darmo)

### Netlify (rekomendowane — najłatwiejsze):
1. Wejdź na https://netlify.com → Sign up (za darmo)
2. Przeciągnij folder z całą stroną na stronę Netlify
3. Gotowe — dostaniesz link np. `lekkost.netlify.app`
4. Możesz podpiąć własną domenę (np. lekkost.pl) w ustawieniach

### GitHub Pages (alternatywa):
1. Załóż konto na github.com
2. Stwórz nowe repozytorium, wgraj pliki
3. Settings → Pages → Deploy from branch

---

## 3. Domena (opcjonalnie)

Kup domenę `lekkost.pl` lub `lekkość.pl` na:
- home.pl (~35 PLN/rok)
- nazwa.pl (~30 PLN/rok)

Podepnij do Netlify według ich instrukcji (DNS settings).

---

## 4. Struktura folderów

```
lekkost/
├── index.html
├── collections.html
├── process.html
├── contact.html
├── checkout.html
├── privacy.html
├── terms.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── checkout.js
└── assets/
    ├── favicon.svg
    └── images/
        ├── hero/
        │   ├── hero-left.jpg    ← zdjęcie na hero (lewa strona)
        │   └── hero-right.jpg   ← zdjęcie na hero (prawa strona)
        ├── journey/             ← zdjęcia na index (scroll journey)
        ├── process/             ← zdjęcia na process.html
        └── collections/
            ├── beige/           ← zdjęcia chust kolekcja beż
            ├── umbra/           ← zdjęcia chust kolekcja umbra
            ├── sage/            ← zdjęcia chust kolekcja błękit pruski
            └── rust/            ← zdjęcia chust kolekcja ecrua
```

### Nazewnictwo zdjęć chust:
Zdjęcia muszą odpowiadać nazwie chusty z script.js, po zamianie polskich znaków:
- "Słoma" → `sloma-1.jpg`, `sloma-2.jpg`, `sloma-3.jpg`
- "Mgła" → `mgla-1.jpg` itd.

---

## 5. Sold out — jak oznaczyć chustę jako sprzedaną

W pliku `js/script.js` znajdź definicję kolekcji i zmień `soldOut: false` na `soldOut: true`:

```javascript
{ name: 'Słoma', roman: 'I', soldOut: true, ... }
```

---

## 6. Stripe — płatności (gdy będzie działalność)

1. Zarejestruj działalność gospodarczą
2. Załóż konto na https://stripe.com/pl
3. W `js/checkout.js` odkomentuj i uzupełnij:
   ```javascript
   window.stripe = Stripe('pk_live_TWOJ_KLUCZ_PUBLICZNY');
   ```
4. Potrzebujesz backendu do obsługi płatności — możliwości:
   - Netlify Functions (darmowe do 125k wywołań/miesiąc)
   - Vercel Serverless Functions (darmowe)
   - Node.js na VPS (~20 PLN/miesiąc na hetzner.com)
