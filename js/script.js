// ============================================
// EMAILJS — konfiguracja
// 1. Zarejestruj się na https://www.emailjs.com
// 2. Dodaj Email Service (Gmail) → skopiuj Service ID
// 3. Stwórz szablon → skopiuj Template ID
// 4. Account → API Keys → skopiuj Public Key
// Wklej swoje klucze poniżej:
// ============================================
const EMAILJS_CONFIG = {
    publicKey:           'WKLEJ_PUBLIC_KEY',     // np. 'abc123XYZ'
    serviceId:           'WKLEJ_SERVICE_ID',     // np. 'service_abc123'
    templateOrder:       'WKLEJ_TEMPLATE_ZAMOWIENIE',  // szablon dla zamówień
    templateContact:     'WKLEJ_TEMPLATE_KONTAKT',     // szablon dla formularza kontakt
    templateNewsletter:  'WKLEJ_TEMPLATE_NEWSLETTER',  // opcjonalny
};

const EMAILJS_READY = EMAILJS_CONFIG.publicKey !== 'WKLEJ_PUBLIC_KEY';

// ============================================
// GOOGLE SHEETS — stan odbitek
// ============================================
let scarfStock = {};

async function loadStockFromSheets() {
    // Wklej tutaj URL swojego arkusza po publikacji jako CSV:
    // Plik → Udostępnij → Opublikuj w internecie → Format: CSV
    const SHEETS_CSV_URL = 'TWOJ_URL_CSV'; // np. https://docs.google.com/spreadsheets/d/XXXX/pub?output=csv

    if (SHEETS_CSV_URL === 'TWOJ_URL_CSV') return; // nie skonfigurowane

    try {
        const res  = await fetch(SHEETS_CSV_URL);
        const text = await res.text();
        // Format arkusza: kolumna A = numer seryjny (01, 02...), kolumna B = dostępne odbitki
        const rows = text.trim().split('\n').slice(1); // pomiń nagłówek
        rows.forEach(row => {
            const [serial, available] = row.split(',').map(s => s.trim().replace(/"/g, ''));
            if (serial && available !== undefined) {
                scarfStock[serial] = parseInt(available) || 0;
            }
        });
        console.log('Stock loaded from Sheets:', scarfStock);
    } catch(err) {
        console.warn('Google Sheets unavailable — using default stock values');
    }
}

// Załaduj stan przy starcie
loadStockFromSheets();

// ============================================
// DANE KOLEKCJI
// ============================================

const collections = {

    // ── Uniesienie I — ciepły beż, złoto, piasek ─────────────────────────
    beige: [
        {
            name: 'Morpho rhetenor',
            roman: 'I',
            soldOut: false,
            serialNumber: '01',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Skrzydło motyla Morpho odbija światło inaczej niż cokolwiek innego — nie barwnikiem, lecz strukturą. Ten odcień beżu jest właśnie taki: widziany raz, zapamiętany inaczej. Jedwab przyjął go cicho, bez oporu.'
        },
        {
            name: 'Calacatta Macchia Vecchia',
            roman: 'II',
            soldOut: false,
            serialNumber: '02',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Marmur Calacatta rodzi się miliony lat — żyły biegną tam gdzie chcą, nie tam gdzie je posyłają. Woda powiedziała jedwabowi to samo. Wzór jest wynikiem rozmowy, nie decyzji.'
        },
        {
            name: 'Aurelia aurita',
            roman: 'III',
            soldOut: false,
            serialNumber: '03',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Meduza Aurelia aurita jest w dziewięćdziesięciu sześciu procentach wodą. Reszta — przezroczysta, drżąca, nieuchwytna. Dokładnie tyle potrzeba żeby istnieć.'
        },
        {
            name: 'Vanadinite',
            roman: 'IV',
            soldOut: false,
            serialNumber: '04',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Minerał wanadinit tworzy kryształy heksagonalne — geometria która wybrała siebie sama. Pigment na jedwabiu nie zapytał o pozwolenie. Osiadł tam gdzie wiedział że powinien.'
        },
        {
            name: 'Papilio blumei',
            roman: 'V',
            soldOut: false,
            serialNumber: '05',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Papilio blumei żyje w koronach drzew — widzi świat z góry, lekko. Kolor który zostawia na jedwabiu jest kolorem powietrza po deszczu. Złoty i spokojny jednocześnie.'
        },
        {
            name: 'Lazurite',
            roman: 'VI',
            soldOut: false,
            serialNumber: '06',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Lazuryt był pierwszym niebem zamkniętym w kamieniu — starożytni mielili go na błękit ultramarin. Ten jedwab pamięta tamten gest. Kolor który ktoś kiedyś wydobył z ziemi żeby oddać niebu.'
        },
        {
            name: 'Nero Marquina',
            roman: 'VII',
            soldOut: false,
            serialNumber: '07',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Czarny marmur z Marąuiny ma białe żyły jak pęknięcia w nocy. Tutaj beż wchodzi w jedwab jako jasność — delikatna, niezdecydowana między dniem a zmrokiem.'
        },
        {
            name: 'Pelagia noctiluca',
            roman: 'VIII',
            soldOut: false,
            serialNumber: '08',
            color: 'Uniesienie I',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie I / 8',
            description: 'Pelagia noctiluca świeci własnym światłem w głębinie. Fosforescencja bez źródła, piękno bez wysiłku. Jedwab trzyma to samo napięcie — beż który świeci od środka.'
        }
    ],

    // ── Uniesienie II — umbra, ziemia, głębia ─────────────────────────────
    umbra: [
        {
            name: 'Umbracula marina',
            roman: 'I',
            soldOut: false,
            serialNumber: '11',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Umbracula marina — ślimak który nosi dom na plecach, wolny mimo to. Kolor umbry jest kolorem ziemi po deszczu, kiedy pachnie głębiej niż zwykle. Jedwab zapamiętał ten moment.'
        },
        {
            name: 'Cinnabar',
            roman: 'II',
            soldOut: false,
            serialNumber: '12',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Cynober był pierwszą czerwienią którą człowiek wydobył z ziemi i oddał obrazowi. Tutaj ta czerwień przyszła ciszej — jako brąz, jako ślad, jako wspomnienie intensywności.'
        },
        {
            name: 'Carabus auratus',
            roman: 'III',
            soldOut: false,
            serialNumber: '13',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Złoty biegacz — chrząszcz który wygląda jak biżuteria porzucona w trawie. Jego pancerz łączy wszystkie odcienie brązu w jednym odbiciu. Ten jedwab robi to samo.'
        },
        {
            name: 'Sienna naturale',
            roman: 'IV',
            soldOut: false,
            serialNumber: '14',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Ziemia z Toskanii ma ten odcień — wypalona, ciepła, starożytna. Malarze suszyli ją i mielili. My zostawiliśmy ją płynną. Pigment sam wybrał jedwab jako dom.'
        },
        {
            name: 'Porphyrio porphyrio',
            roman: 'V',
            soldOut: false,
            serialNumber: '15',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Modrzyk zwyczajny nosi barwy których nie powinno być razem — fiolet, błękit, czerwień. Na jedwabiu zostało tylko to co najcichsze: głęboki brąz z cieniem czegoś intensywnego.'
        },
        {
            name: 'Fossil wood',
            roman: 'VI',
            soldOut: false,
            serialNumber: '16',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Skrzemionowane drewno — drzewo które zamieniło się w kamień i przeżyło milion lat. Słoje zostały, kolor stał się ciemniejszy. Ten jedwab pamięta coś czego my nie możemy.'
        },
        {
            name: 'Bronzite',
            roman: 'VII',
            soldOut: false,
            serialNumber: '17',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Bronzyt połyskuje jak metal, a jest kamieniem. Granica między materią a pięknem jest tutaj umowna. Jedwab zapytał o to samo i nie znalazł odpowiedzi — zostało odbicie.'
        },
        {
            name: 'Arachnocampa luminosa',
            roman: 'VIII',
            soldOut: false,
            serialNumber: '18',
            color: 'Uniesienie II',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie II / 8',
            description: 'Larwy Arachnocampa świecą w nowozelandzkich grotach — niebo pod ziemią. Ten jedwab ma w sobie tę samą paradoksalną głębię: ciemny i jasny jednocześnie, jak grota pełna gwiazd.'
        }
    ],

    // ── Uniesienie III — błękit pruski, głębiny, indygo ──────────────────
    sage: [
        {
            name: 'Indigofera tinctoria',
            roman: 'I',
            soldOut: false,
            serialNumber: '21',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Indygowiec barwierski był handlowany jak złoto. Niebieskie szlaki kupieckie prowadziły przez kontynenty — wszystko dla tego odcienia. Jedwab przyjął go jak przyjmuje się coś na co się czekało.'
        },
        {
            name: 'Physalia physalis',
            roman: 'II',
            soldOut: false,
            serialNumber: '22',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Bąbel portugalski unosi się na powierzchni oceanu — piękny i śmiertelny. Niebieskość którą nosi jest kolorem otwartego morza. Ten jedwab ma w sobie to samo drżenie.'
        },
        {
            name: 'Lazurite',
            roman: 'III',
            soldOut: false,
            serialNumber: '23',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Starożytni płacili za lazuryt więcej niż za złoto. Vermeer zrujnował się kupując go dla swoich błękitów. Ten jedwab nie kosztuje tyle — ale nosi ten sam spokój absolutny.'
        },
        {
            name: 'Apatite',
            roman: 'IV',
            soldOut: false,
            serialNumber: '24',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Apatyt jest twardością kości i szkliwa — minerał z którego zbudowane jest ciało. Kolor jego kryształów to błękit morski przed burzą. Jedwab zapytał wodę o to samo i dostał odpowiedź.'
        },
        {
            name: 'Glaucus atlanticus',
            roman: 'V',
            soldOut: false,
            serialNumber: '25',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Glaucus atlanticus pływa odwrócony — brzuchem do góry, błękitem skierowany w niebo jako kamuflaż. Nie wiadomo gdzie kończy się ocean a zaczyna ten ślimak. Jedwab ma to samo pytanie.'
        },
        {
            name: 'Covellite',
            roman: 'VI',
            soldOut: false,
            serialNumber: '26',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Kowellit — minerał miedziowy o odcieniu między niebieskim a fioletowym — zmienia kolor zależnie od kąta światła. Ten jedwab robi to samo: rano jest inny niż wieczorem.'
        },
        {
            name: 'Morpho menelaus',
            roman: 'VII',
            soldOut: false,
            serialNumber: '27',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Morpho menelaus jest niebieskim niemożliwym — kolor który nie istnieje jako barwnik, tylko jako struktura skrzydła. Jedwab próbował go odtworzyć. Wyszło coś własnego — równie niemożliwego.'
        },
        {
            name: 'Celestine',
            roman: 'VIII',
            soldOut: false,
            serialNumber: '28',
            color: 'Uniesienie III',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie III / 8',
            description: 'Celestyn — niebiański — kryształ koloru zimowego nieba o świcie. Delikatny do złamania, piękny bez wysiłku. Pigment osiadł na jedwabiu z tą samą kruchą pewnością siebie.'
        }
    ],

    // ── Uniesienie IV — ecru, kość, biel złamana ─────────────────────────
    rust: [
        {
            name: 'Apis mellifera',
            roman: 'I',
            soldOut: false,
            serialNumber: '31',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Pszczoła miodna produkuje wosk który jest ciepłym ecru — kolor powstały z tysiąca kwiatów przefiltrowanych przez czas. Ten jedwab ma tę samą słodką powagę.'
        },
        {
            name: 'Calcite',
            roman: 'II',
            soldOut: false,
            serialNumber: '32',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Kalcyt buduje muszle, rafy koralowe, jaskinie. Biel która ma w sobie historię morza — nie czysta, lecz pamiętająca. Jedwab przyjął ją jak przyjmuje się starą znajomość.'
        },
        {
            name: 'Gonepteryx rhamni',
            roman: 'III',
            soldOut: false,
            serialNumber: '33',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Latolistek cytrynek jest pierwszym motylem wiosny — żółtawy, blady, nieśmiały. Przylatuje zanim cokolwiek jest gotowe. Ten jedwab ma ten sam odcień niecierpliwości.'
        },
        {
            name: 'Pearl nacre',
            roman: 'IV',
            soldOut: false,
            serialNumber: '34',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Macica perłowa jest zbudowana z tych samych kryształów co kreda — ale ułożonych w warstwy tak precyzyjne że stają się tęczą. Ten jedwab zatrzymał ten moment tuż przed kolorem.'
        },
        {
            name: 'Alabaster',
            roman: 'V',
            soldOut: false,
            serialNumber: '35',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Alabaster jest tak miękki że można go porysować paznokciem — i tak piękny że rzeźbili w nim bogów. Biel która przepuszcza światło. Ten jedwab robi to samo przy oknie.'
        },
        {
            name: 'Leucophaea maderae',
            roman: 'VI',
            soldOut: false,
            serialNumber: '36',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Leucophaea to owad koloru starych listów — ecru z pamięcią. Żyje nocą, w ciszy, bez rozgłosu. Ten jedwab też nie krzyczy. Mówi tylko do tych którzy słuchają.'
        },
        {
            name: 'Moonstone',
            roman: 'VII',
            soldOut: false,
            serialNumber: '37',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Kamień księżycowy zmienia kolor zależnie od kąta — efekt zwany adularescencją, po górze Adula gdzie go znaleziono. Ten jedwab też nie jest tym samym o świcie i o zmroku.'
        },
        {
            name: 'Vanilla planifolia',
            roman: 'VIII',
            soldOut: false,
            serialNumber: '38',
            color: 'Uniesienie IV',
            priceOriginal: '799 PLN',
            pricePrint: '799 PLN',
            material: 'Jedwab',
            size: '68 × 68 cm',
            process: 'Ebru, pigmenty naturalne',
            series: 'Uniesienie IV / 8',
            description: 'Wanilia rośnie jako pnącze, kwitnie jeden dzień i musi być zapylona ręcznie. Tyle wysiłku dla zapachu który znamy jako oczywisty. Ten jedwab też jest pełen niewidzialnej pracy.'
        }
    ]
};


// Helper — ścieżka do zdjęcia chusty
function getImagePath(colorKey, scarf, num) {
    // Jeśli chusta ma pole image — użyj go
    if (scarf.image) return `assets/images/collections/${colorKey}/${scarf.image}-${num}.jpg`;
    // Inaczej — slug z nazwy łacińskiej (lowercase, spacje → myślniki)
    const slug = scarf.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `assets/images/collections/${colorKey}/${slug}-${num}.jpg`;
}

const colorMap = {
    beige: '#E8DDD0',
    umbra: '#7A6855',
    sage: '#4A7BA7',
    rust: '#B8845F'
};

// ============================================
// FUNKCJE
// ============================================

function renderCollection(colorKey) {
    const grid = document.getElementById('scarvesGrid');

    if (!grid) {
        console.error('Brak elementu scarvesGrid');
        return;
    }

    const scarves = collections[colorKey];

    if (!scarves) {
        console.error('Kolekcja nie znaleziona:', colorKey);
        return;
    }
    // Tło sekcji jest teraz obsługiwane przez zdjęcie (.collections-bg-img),
    // nie przez zmianę koloru — usunięto dynamiczne tło JS.

grid.innerHTML = scarves.map((scarf, index) => {
    const scarfSlug = scarf.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/ł/g, 'l')
        .replace(/ó/g, 'o')
        .replace(/ą/g, 'a')
        .replace(/ć/g, 'c')
        .replace(/ź/g, 'z')
        .replace(/ż/g, 'z')
        .replace(/ę/g, 'e')
        .replace(/ń/g, 'n')
        .replace(/ś/g, 's');
    
    const imagePath = getImagePath(colorKey, scarf, 1);
    const bgColor = colorMap[colorKey];
    
    const isSoldOut = scarf.soldOut === true;
    return `
        <div class="scarf-card-full ${isSoldOut ? 'sold-out' : ''}" data-scarf-index="${index}" data-color="${colorKey}" data-sold="${isSoldOut}">
            <div class="scarf-image-full" id="card-img-${colorKey}-${index}"
                 style="background-image: url('${imagePath}'); background-color: ${bgColor};">
            </div>
            ${isSoldOut ? '<div class="scarf-sold-badge">Sprzedana</div>' : ''}
            <div class="scarf-info-overlay">
                <div class="scarf-name-full">${scarf.name}</div>
                <div class="scarf-roman-full">${scarf.roman}</div>
            </div>
        </div>
    `;
}).join('');

    document.querySelectorAll('.scarf-card-full').forEach(card => {
        card.addEventListener('click', function() {
            if (this.dataset.sold === 'true') return;
            const index = this.dataset.scarfIndex;
            const color = this.dataset.color;
            openScarfModal(color, index);
        });

        // Hover — płynny crossfade przez nakładkę img
        (function(c) {
            const color = c.dataset.color;
            const scarfIdx = c.dataset.scarfIndex;
            const scarf = collections[color][scarfIdx];
            if (!scarf || c.dataset.sold === 'true') return;

            const img1 = getImagePath(color, scarf, 1);
            const img2 = getImagePath(color, scarf, 2);

            // Preload
            const preloadImg = new Image();
            preloadImg.src = img2;

            // Stwórz nakładkę — drugie zdjęcie nad pierwszym, opacity:0
            const overlay = document.createElement('div');
            overlay.className = 'scarf-hover-overlay';
            overlay.style.backgroundImage = `url('${img2}')`;
            c.appendChild(overlay);

            let timer = null;

            c.addEventListener('mouseenter', function() {
                timer = setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 500);
            });

            c.addEventListener('mouseleave', function() {
                clearTimeout(timer);
                overlay.style.opacity = '0';
            });
        })(card);

        // Gdy brak zdjęcia — pokaż placeholder z nazwą
        const imgDiv = card.querySelector('.scarf-image-full');
        const index = card.dataset.scarfIndex;
        const color = card.dataset.color;
        const scarf = collections[color][index];

        if (imgDiv && imgDiv.style.backgroundImage) {
            const url = imgDiv.style.backgroundImage.replace(/url\(['"]*|['"]*\)/g, '');
            const img = new Image();
            img.onerror = function() {
                imgDiv.style.backgroundImage = 'none';
                imgDiv.innerHTML = `
                    <div class="scarf-placeholder">
                        <div class="scarf-placeholder-roman">${scarf.roman}</div>
                        <div class="scarf-placeholder-name">${scarf.name}</div>
                    </div>`;
            };
            img.src = url;
        }
    });
}

// Stan galerii
let gallery = { images: [], current: 0 };

function gallerySet(idx) {
    if (idx < 0) idx = gallery.images.length - 1;
    if (idx >= gallery.images.length) idx = 0;
    gallery.current = idx;
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) {
        mainImg.style.transition = 'opacity 0.45s ease';
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = gallery.images[idx];
            mainImg.style.opacity = '1';
        }, 380);
    }
    document.querySelectorAll('#modalThumbnails .modal-thumb')
        .forEach((t, i) => t.classList.toggle('active', i === idx));
}

function openScarfModal(colorKey, scarfIndex) {
    const scarf = collections[colorKey][scarfIndex];
    const modal = document.getElementById('scarfModal');
    if (!scarf || !modal) return;

    // Galeria
    gallery.images = [
        getImagePath(colorKey, scarf, 1),
        getImagePath(colorKey, scarf, 2),
        getImagePath(colorKey, scarf, 3),
        getImagePath(colorKey, scarf, 4)
    ];
    gallery.current = 0;

    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) { mainImg.src = gallery.images[0]; mainImg.style.opacity = '1'; }

    // Miniatury — buduj dynamicznie
    const thumbsCont = document.getElementById('modalThumbnails');
    if (thumbsCont) {
        thumbsCont.innerHTML = gallery.images.map((src, i) =>
            `<img class="modal-thumb${i===0?' active':''}" src="${src}" data-idx="${i}" loading="lazy">`
        ).join('');
        thumbsCont.onclick = e => {
            const t = e.target.closest('.modal-thumb');
            if (t) gallerySet(parseInt(t.dataset.idx));
        };
    }

    // Strzałki
    const prev = document.getElementById('galleryPrev');
    const next = document.getElementById('galleryNext');
    if (prev) prev.onclick = () => gallerySet(gallery.current - 1);
    if (next) next.onclick = () => gallerySet(gallery.current + 1);

    // Swipe
    let tx = 0;
    if (mainImg) {
        mainImg.ontouchstart = e => { tx = e.touches[0].clientX; };
        mainImg.ontouchend   = e => {
            const d = tx - e.changedTouches[0].clientX;
            if (Math.abs(d) > 40) gallerySet(gallery.current + (d > 0 ? 1 : -1));
        };
    }

    // Klawiatura — strzałki
    if (modal._keyHandler) document.removeEventListener('keydown', modal._keyHandler);
    modal._keyHandler = e => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'ArrowRight') gallerySet(gallery.current + 1);
        if (e.key === 'ArrowLeft')  gallerySet(gallery.current - 1);
        if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', modal._keyHandler);

    // Treść
    document.getElementById('modalTitle').textContent = scarf.name;
    document.getElementById('modalColor').textContent = '';
    document.getElementById('modalDescription').textContent = scarf.description;

    // Licznik ze Sheets lub default
    const available = typeof scarfStock !== 'undefined' && scarfStock[scarf.serialNumber]
        ? scarfStock[scarf.serialNumber]
        : (scarf.available !== undefined ? scarf.available : 8);

    // No. II  8/8 — jedna linia
    const numLine = scarf.roman ? `
        <div class="modal-num-line">
            <span class="modal-num">No.&thinsp;${scarf.roman}</span>
            <span class="modal-stock-inline">${available}&thinsp;/&thinsp;8</span>
        </div>` : '';

    document.getElementById('modalDetails').innerHTML = `
        ${numLine}
        <div class="modal-specs-grid">
            <p><strong>Materiał</strong><span>${scarf.material}</span></p>
            <p><strong>Wymiary</strong><span>${scarf.size}</span></p>
        </div>`;

    // Typ / cena
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.type-btn[data-type="original"]').classList.add('active');

    // Przycisk zamówienia
    // Typ — tylko oryginał, brak wyboru

    const orderBtn = document.getElementById('orderBtnLarge');
    const soldNotice = document.getElementById('modalSoldNotice');
    if (scarf.soldOut) {
        if (orderBtn)   orderBtn.style.display   = 'none';
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

    sessionStorage.setItem('selectedScarf', scarf.name);
    sessionStorage.setItem('selectedColor', colorKey);
    sessionStorage.setItem('selectedIndex', scarfIndex);
    sessionStorage.setItem('selectedPrice', scarf.priceOriginal);
    sessionStorage.setItem('selectedType',  'original');

    modal.classList.add('active');
    modal.querySelector('.modal-large-content').scrollTop = 0;
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new Event('modal-opened'));
}

function closeModal() {
    const modal = document.getElementById('scarfModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (modal._keyHandler) {
        document.removeEventListener('keydown', modal._keyHandler);
        modal._keyHandler = null;
    }
    // Newsletter po zamknięciu modala
    if (!sessionStorage.getItem('newsletterShown')) {
        setTimeout(() => showNewsletterToast(), 600);
    }
}

// Zablokuj poziomy bounce w modalu na iOS
(function() {
    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        const modal = document.getElementById('scarfModal');
        if (!modal || !modal.classList.contains('active')) return;

        const dx = Math.abs(e.touches[0].clientX - startX);
        const dy = Math.abs(e.touches[0].clientY - startY);

        // Jeśli ruch bardziej poziomy niż pionowy — zablokuj całkowicie
        if (dx > dy) {
            e.preventDefault();
        }
    }, { passive: false });
})();

// ============================================
// EVENT LISTENERY
// ============================================

// Walidacja formularzy
function validateContactForm(form) {
    let valid = true;
    form.querySelectorAll('.form-field').forEach(field => {
        const input = field.querySelector('input, textarea');
        const errorMsg = field.querySelector('.field-error-msg');
        if (!input) return;
        const value = input.value.trim();
        let error = '';
        if (input.hasAttribute('required') && !value) {
            error = 'To pole jest wymagane';
        } else if (input.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Podaj prawidłowy adres email';
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
    return valid;
}

// Czyść błąd przy pisaniu
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('field-error')) {
        e.target.classList.remove('field-error');
        const msg = e.target.closest('.form-field')?.querySelector('.field-error-msg');
        if (msg) msg.classList.remove('visible');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const scarvesGrid = document.getElementById('scarvesGrid');
    if (scarvesGrid) {
        renderCollection('beige');
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const grid = document.getElementById('scarvesGrid');
            if (grid) {
                grid.classList.add('fading');
                setTimeout(() => {
                    renderCollection(this.dataset.color);
                    grid.classList.remove('fading');
                }, 280);
            } else {
                renderCollection(this.dataset.color);
            }
        });
    });

    const typeBtns = document.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            typeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const titleText = document.getElementById('modalTitle').textContent;
            let foundScarf = null;

            for (const colorKey in collections) {
                const found = collections[colorKey].find(s => titleText.includes(s.name));
                if (found) {
                    foundScarf = found;
                    break;
                }
            }

            if (foundScarf) {
                const price = this.dataset.type === 'original' ? foundScarf.priceOriginal : foundScarf.pricePrint;
                document.getElementById('priceDisplay').textContent = price;
                sessionStorage.setItem('selectedPrice', price);
            }

            sessionStorage.setItem('selectedType', this.dataset.type);
        });
    });

    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('scarfModal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    const orderBtn = document.getElementById('orderBtnLarge');
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            const scarf = sessionStorage.getItem('selectedScarf');
            const type = sessionStorage.getItem('selectedType') || 'original';
            const price = sessionStorage.getItem('selectedPrice');
            window.location.href = `checkout.html?scarf=${encodeURIComponent(scarf)}&type=${type}&price=${encodeURIComponent(price)}`;
        });
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    if (typeof emailjs !== 'undefined' && EMAILJS_READY) {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }

    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!validateContactForm(this)) return;
            const btn  = contactForm.querySelector('.submit-btn');
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (btn) { btn.textContent = 'Wysyłanie...'; btn.disabled = true; }

            let success = false;
            if (typeof emailjs !== 'undefined') {
                try {
                    await emailjs.send(
                        EMAILJS_CONFIG.serviceId,
                        EMAILJS_CONFIG.templateContact,
                        { from_name: name, from_email: email, message, reply_to: email }
                    );
                    success = true;
                } catch(err) { console.error('EmailJS:', err); }
            } else {
                // Fallback gdy EmailJS nie załadowany
                success = true;
            }

            if (success) {
                if (btn) { btn.textContent = 'Wysłano ✓'; }
                setTimeout(() => {
                    if (btn) { btn.textContent = 'Wyślij'; btn.disabled = false; }
                    contactForm.reset();
                    contactForm.querySelectorAll('.field-error-msg').forEach(m => m.classList.remove('visible'));
                }, 3000);
            } else {
                if (btn) { btn.textContent = 'Błąd — spróbuj ponownie'; btn.disabled = false; }
            }
        });
    }

    // Hamburger menu
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar2 = document.querySelector('.navbar');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navLinks.classList.toggle('open');

            // Gdy menu otwarte — navbar i hamburger ciemne niezależnie od tła
            const isOpen = navLinks.classList.contains('open');
            if (isOpen) {
                if (navbar2) navbar2.classList.add('menu-open');
                // Wymuś ciemne kolory inline — najwyższy priorytet
                hamburger.querySelectorAll('span').forEach(s => {
                    s.style.setProperty('background-color', '#5C4033', 'important');
                });
                const logo = document.querySelector('.logo');
                if (logo) logo.style.setProperty('color', '#2C2420', 'important');
            } else {
                if (navbar2) navbar2.classList.remove('menu-open');
                hamburger.querySelectorAll('span').forEach(s => {
                    s.style.removeProperty('background-color');
                });
                const logo = document.querySelector('.logo');
                if (logo) logo.style.removeProperty('color');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                if (navbar2) navbar2.classList.remove('menu-open');
                hamburger.querySelectorAll('span').forEach(s => {
                    s.style.backgroundColor = '';
                });
                const logo = document.querySelector('.logo');
                if (logo) logo.style.color = '';
            });
        });
    }
});

// ============================================
// SCROLL ANIMATIONS — Intersection Observer
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.journey-item, .process-step-full, .philosophy-landing, .process-philosophy-full, .contact-section, .collections-header').forEach(el => {
        el.classList.add('scroll-hidden');
        observer.observe(el);
    });
}

// ============================================
// PAGE TRANSITIONS — fade out/in
// ============================================
function initPageTransitions() {
    document.body.classList.add('page-ready');

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        // tylko wewnętrzne linki .html, nie anchory, nie mailto, nie target blank
        if (!href || href.startsWith('#') || href.startsWith('mailto') ||
            href.startsWith('http') || link.target === '_blank') return;

        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.add('page-leaving');
            setTimeout(() => {
                window.location.href = href;
            }, 340);
        });
    });
}

// ============================================
// CUSTOM CURSOR — cienki krzyżyk
// ============================================

// ============================================
// LICZNIK DOSTĘPNOŚCI w collections
// ============================================
function updateAvailabilityCounter(colorKey) {
    const counter = document.getElementById('availabilityCounter');
    if (!counter || !collections[colorKey]) return;

    const available = collections[colorKey].filter(s => !s.soldOut).length;
    const collectionName = {
        beige: 'Uniesienie I',
        umbra: 'Uniesienie II',
        sage:  'Uniesienie III',
        rust:  'Uniesienie IV'
    }[colorKey] || '';

    counter.innerHTML = `
        <span class="counter-collection">${collectionName}</span>
        <span class="counter-divider"> — </span>
        <span class="counter-label">Pozostało </span>
        <span class="counter-available">${available}</span>
        <span class="counter-label"> z 8</span>
    `;
    counter.style.opacity = '1';
}


// ============================================
// NEWSLETTER TOAST — po zamknięciu modala
// ============================================
function showNewsletterToast() {
    if (sessionStorage.getItem('newsletterShown')) return;
    sessionStorage.setItem('newsletterShown', '1');

    const toast = document.createElement('div');
    toast.className = 'newsletter-toast';
    toast.innerHTML = `
        <button class="newsletter-close" aria-label="Zamknij">&times;</button>
        <p class="newsletter-eyebrow">Nowe kolekcje</p>
        <p class="newsletter-text">Powiadomimy Cię gdy pojawią się nowe chusty.</p>
        <form class="newsletter-form" id="newsletterForm">
            <div class="newsletter-input-row">
                <input type="email" placeholder="Twój email" required>
                <button type="submit">→</button>
            </div>
        </form>
    `;
    document.body.appendChild(toast);

    // Animacja wejścia
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('toast-visible'));
    });

    // Zamknij X
    toast.querySelector('.newsletter-close').addEventListener('click', () => {
        toast.classList.remove('toast-visible');
        setTimeout(() => toast.remove(), 400);
    });

    // Submit
    toast.querySelector('#newsletterForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = '✓';
        btn.disabled = true;

        // EmailJS — wyślij email powitalny / zapisz do listy
        if (typeof emailjs !== 'undefined') {
            try {
                await emailjs.send(
                    typeof EJS_SERVICE_ID !== 'undefined' ? EJS_SERVICE_ID : 'TWOJ_SERVICE_ID',
                    'TWOJ_TEMPLATE_NEWSLETTER',
                    { subscriber_email: email }
                );
            } catch(e) { console.log('EmailJS newsletter:', e); }
        }

        setTimeout(() => {
            toast.classList.remove('toast-visible');
            setTimeout(() => toast.remove(), 400);
        }, 1800);
    });

    // Auto-zamknij po 12s
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.remove('toast-visible');
            setTimeout(() => toast.remove(), 400);
        }
    }, 12000);
}

// Init wszystkiego
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initPageTransitions();

    // Navbar — transparentny na hero, jasny po scrollu
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-landing, .process-hero-fullbleed');
    const collectionsFilterBar = document.querySelector('.collections-filter-bar');

    if (navbar && hero) {
        const onScroll = () => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            if (heroBottom <= 0) {
                navbar.classList.add('scrolled');
                // Usuń inline style żeby CSS .scrolled mógł działać
                navbar.style.removeProperty('background-color');
                navbar.style.removeProperty('border-bottom');
            } else {
                navbar.classList.remove('scrolled');
                // Przywróć transparent inline
                navbar.style.setProperty('background-color', 'transparent', 'important');
                navbar.style.setProperty('border-bottom', 'none', 'important');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    } else if (navbar && collectionsFilterBar) {
        const onScrollCollections = () => {
            // scrolled gdy zjechano poza pasek filtrów (~200px)
            const filterBar = document.querySelector('.collections-filter-bar');
            const threshold = filterBar
                ? filterBar.getBoundingClientRect().bottom
                : 200;
            if (threshold <= 70) {
                navbar.classList.add('scrolled');
                navbar.style.removeProperty('background-color');
                navbar.style.removeProperty('border-bottom');
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.setProperty('background-color', 'transparent', 'important');
                navbar.style.setProperty('border-bottom', 'none', 'important');
            }
        };
        window.addEventListener('scroll', onScrollCollections, { passive: true });
        onScrollCollections();
    } else if (navbar) {
        // Sprawdź czy strona ma własne zdjęcie tła (collections)
        // lub jest stroną bez żadnego hero
        const isHeroPage = document.body.classList.contains('hero-page') ||
                           document.body.classList.contains('collections-page');
        if (!isHeroPage) {
            // Strony bez zdjęcia tła (about, contact, checkout etc)
            // navbar jasny od razu
            document.body.classList.add('no-hero');
            navbar.classList.add('scrolled');
        }
        // hero-page i collections-page są obsługiwane przez CSS :not(.scrolled)
    }

    // Newsletter na collections — jeśli użytkownik nie otworzył modala przez 30s
    if (document.getElementById('scarvesGrid')) {
        let modalOpened = false;
        document.addEventListener('modal-opened', () => { modalOpened = true; });
        setTimeout(() => {
            if (!modalOpened && !sessionStorage.getItem('newsletterShown')) {
                showNewsletterToast();
            }
        }, 30000);
    }
});
