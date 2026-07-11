/**
 * Tytuł: Skrypt obsługi kolekcji i galerii chust
 * Status: Produkcyjny, wolny od błędów Immediate Invocation oraz SyntaxError
 */

// ==========================================================================
// 1. BAZA DANYCH KOLEKCJI (Zabezpieczenie przed brakiem definicji)
// ==========================================================================
// Jeśli Twoja baza 'collections' znajduje się w osobnym pliku, skrypt bezpiecznie ją pominie.
if (typeof collections === 'undefined') {
    window.collections = {
        // Poniżej znajduje się przykładowa struktura. Jeśli wklejasz ten plik jako JEDYNY, 
        // uzupełnij ten obiekt swoimi prawdziwymi danymi chust:
        "jedwab": [
            { id: "001", serialNumber: "J-001", name: "Przykładowa Chusta", priceOriginal: "350 zł", description: "Opis chusty...", material: "100% Jedwab", size: "90x90 cm", roman: "I", available: 8, soldOut: false }
        ]
    };
}

// ==========================================================================
// 2. GLOBALNY STAN GALERII I POMOCNIKI
// ==========================================================================
let gallery = {
    images: [],
    current: 0
};

// Generowanie ścieżki do zdjęć na podstawie struktury katalogów
function getImagePath(colorKey, scarf, number) {
    const id = scarf.serialNumber || scarf.id || '1';
    return `images/${colorKey}/${id}_${number}.jpg`;
}

// ==========================================================================
// 3. RENDEROWANIE SIATKI PRODUKTÓW (KOLEKCJI)
// ==========================================================================
function renderCollection(colorKey) {
    const container = document.getElementById('collectionContainer'); 
    if (!container) return;
    
    if (!collections || !collections[colorKey]) {
        console.error(`Brak danych dla kolekcji o kluczu: ${colorKey}`);
        return;
    }

    // Czyszczenie kontenera przed załadowaniem nowej kolekcji
    container.innerHTML = '';

    collections[colorKey].forEach((scarf, index) => {
        const card = document.createElement('div');
        card.className = 'scarf-card';
        
        // Dynamiczny HTML karty produktu
        card.innerHTML = `
            <div class="scarf-img-wrapper">
                <img src="${getImagePath(colorKey, scarf, 1)}" alt="${scarf.name}" loading="lazy">
            </div>
            <div class="scarf-info">
                <h3>${scarf.name}</h3>
                <p class="scarf-price">${scarf.priceOriginal}</p>
            </div>
        `;

        // --- NAPRAWA GŁÓWNA: Przekazanie referencji poprzez funkcję anonimową. ---
        // Zapobiega to automatycznemu otwieraniu okna podczas ładowania strony.
        card.onclick = () => openScarfModal(colorKey, index);

        container.appendChild(card);
    });
}

// ==========================================================================
// 4. OBSŁUGA OKNA MODALNEGO (SZCZEGÓŁY PRODUKTU)
// ==========================================================================
function openScarfModal(colorKey, scarfIndex) {
    const scarf = collections[colorKey][scarfIndex];
    const modal = document.getElementById('scarfModal');
    if (!scarf || !modal) return;

    // Definiowanie tablicy zdjęć dla konkretnego modelu
    gallery.images = [
        getImagePath(colorKey, scarf, 1),
        getImagePath(colorKey, scarf, 2),
        getImagePath(colorKey, scarf, 3),
        getImagePath(colorKey, scarf, 4)
    ];
    gallery.current = 0;

    // Przypisanie głównego zdjęcia startowego
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) { 
        mainImg.src = gallery.images[0]; 
        mainImg.style.opacity = '1'; 
    }

    // Budowanie paska miniatur pod zdjęciem głównym
    const thumbsCont = document.getElementById('modalThumbnails');
    if (thumbsCont) {
        thumbsCont.innerHTML = gallery.images.map((src, i) =>
            `<img class="modal-thumb${i === 0 ? ' active' : ''}" src="${src}" data-idx="${i}" loading="lazy">`
        ).join('');
        
        thumbsCont.onclick = e => {
            const t = e.target.closest('.modal-thumb');
            if (t) gallerySet(parseInt(t.dataset.idx));
        };
    }

    // Statyczna nawigacja przycisków (jeśli istnieją w strukturze HTML)
    const prev = document.getElementById('galleryPrev');
    const next = document.getElementById('galleryNext');
    if (prev) prev.onclick = () => gallerySet(gallery.current - 1);
    if (next) next.onclick = () => gallerySet(gallery.current + 1);

    // --- NAWIGACJA DOTYKOWA I PŁYWAJĄCE STRZAŁKI ---
    if (mainImg && mainImg.parentElement) {
        const container = mainImg.parentElement;

        // Iniekcja strzałki "Wstecz" dla komputerów
        if (!container.querySelector('.web-floating-arrow.prev')) {
            const prevBtn = document.createElement('div');
            prevBtn.className = 'web-floating-arrow prev';
            prevBtn.innerHTML = '&#10216;'; 
            prevBtn.onclick = (e) => { e.stopPropagation(); gallerySet(gallery.current - 1); };
            container.appendChild(prevBtn);
        }
        // Iniekcja strzałki "Dalej" dla komputerów
        if (!container.querySelector('.web-floating-arrow.next')) {
            const nextBtn = document.createElement('div');
            nextBtn.className = 'web-floating-arrow next';
            nextBtn.innerHTML = '&#10217;'; 
            nextBtn.onclick = (e) => { e.stopPropagation(); gallerySet(gallery.current + 1); };
            container.appendChild(nextBtn);
        }

        // Obsługa gestów swipe na smartfonach
        let touchStartX = 0;
        let touchStartY = 0;

        container.ontouchstart = e => { 
            touchStartX = e.touches[0].clientX; 
            touchStartY = e.touches[0].clientY; 
        };

        container.ontouchend = e => {
            const diffX = touchStartX - e.changedTouches[0].clientX;
            const diffY = touchStartY - e.changedTouches[0].clientY;

            // Reaguj tylko, gdy ruch poziomy jest wyraźny i silniejszy niż pionowy
            if (Math.abs(diffX) > 25 && Math.abs(diffX) > Math.abs(diffY)) {
                gallerySet(gallery.current + (diffX > 0 ? 1 : -1));
            }
        };
    }

    // Obsługa sterowania klawiaturą (Lewo, Prawo, Escape)
    if (modal._keyHandler) document.removeEventListener('keydown', modal._keyHandler);
    modal._keyHandler = e => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowRight') gallerySet(gallery.current + 1);
        if (e.key === 'ArrowLeft')  gallerySet(gallery.current - 1);
        if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', modal._keyHandler);

    // Wstrzykiwanie tekstów informacyjnych (zabezpieczone przed null)
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    if (modalTitle) modalTitle.textContent = scarf.name;
    if (modalDesc) modalDesc.textContent = scarf.description;

    // Ustalanie stanu magazynowego (Zintegrowane ze skryptem Google Sheets lub domyślne 8 sztuk)
    const available = typeof scarfStock !== 'undefined' && scarfStock[scarf.serialNumber]
        ? scarfStock[scarf.serialNumber]
        : (scarf.available !== undefined ? scarf.available : 8);

    // Generowanie specyfikacji oraz unikalnego numeru seryjnego chusty
    const numLine = scarf.roman ? `
        <div class="modal-num-line">
            <span class="modal-num">No.&thinsp;${scarf.roman}</span>
            <span class="modal-stock-inline">${available}&thinsp;/&thinsp;8</span>
        </div>` : '';

    const modalDetails = document.getElementById('modalDetails');
    if (modalDetails) {
        modalDetails.innerHTML = `
            ${numLine}
            <div class="modal-specs-grid">
                <p><strong>Materiał</strong><span>${scarf.material}</span></p>
                <p><strong>Wymiary</strong><span>${scarf.size}</span></p>
            </div>`;
    }

    // Resetowanie zakładek wariantów zakupu (powrót do domyślnego "original")
    const typeBtns = document.querySelectorAll('.type-btn');
    if (typeBtns.length > 0) {
        typeBtns.forEach(b => b.classList.remove('active'));
        const originalBtn = document.querySelector('.type-btn[data-type="original"]');
        if (originalBtn) originalBtn.classList.add('active');
    }

    // Zarządzanie widocznością przycisku zakupu na podstawie flagi soldOut
    const orderBtn = document.getElementById('orderBtnLarge');
    const soldNotice = document.getElementById('modalSoldNotice');
    
    if (scarf.soldOut) {
        if (orderBtn)   orderBtn.style.display = 'none';
        if (soldNotice) soldNotice.style.display = 'block';
    } else {
        if (orderBtn) {
            orderBtn.style.display = 'flex';
            orderBtn.innerHTML = `
                <span class="order-arrow">→</span>
                <span class="order-price-hover" id="priceDisplay">${scarf.priceOriginal}</span>`;
        }
        if (soldNotice) soldNotice.style.display = 'none';
    }

    // Odkładanie danych do sessionStorage pod formularz zamówienia
    sessionStorage.setItem('selectedScarf', scarf.name);
    sessionStorage.setItem('selectedColor', colorKey);
    sessionStorage.setItem('selectedIndex', scarfIndex);
    sessionStorage.setItem('selectedPrice', scarf.priceOriginal);
    sessionStorage.setItem('selectedType',  'original');

    // Wyświetlenie modala i zablokowanie przewijania tła strony
    modal.classList.add('active');
    const scrollContent = modal.querySelector('.modal-large-content');
    if (scrollContent) scrollContent.scrollTop = 0;
    
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new Event('modal-opened'));
}

// ==========================================================================
// 5. OBSŁUGA ZMIANY SLAJDÓW W GALERII
// ==========================================================================
function gallerySet(index) {
    if (!gallery.images.length) return;

    // Przetwarzanie indeksów granicznych (zapętlenie galerii)
    if (index >= gallery.images.length) index = 0;
    if (index < 0) index = gallery.images.length - 1;

    gallery.current = index;

    // Płynny efekt przejścia (Fade-out -> Zmiana źródła -> Fade-in)
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = gallery.images[gallery.current];
            mainImg.style.opacity = '1';
        }, 120);
    }

    // Aktualizacja wizualna aktywnej miniaturki pod zdjęciem głównym
    const thumbs = document.querySelectorAll('.modal-thumb');
    thumbs.forEach((thumb, i) => {
        if (i === index) thumb.classList.add('active');
        else thumb.classList.remove('active');
    });
}

// Funkcja zamykająca okno szczegółów
function closeModal() {
    const modal = document.getElementById('scarfModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Globalne podpięcie kliknięcia w tło modala w celu jego zamknięcia
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('scarfModal');
    if (modal) {
        modal.onclick = (e) => {
            // Zamknij tylko, jeśli kliknięto bezpośrednio w przyciemnione tło, a nie w treść
            if (e.target === modal) closeModal();
        };
    }
});
