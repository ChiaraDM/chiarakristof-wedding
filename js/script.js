$(function () {
    const t = new Translator(new Language());
    t.translatePage();
});

class Language {
    static HUNGARIAN = 1;
    static ENGLISH = 2;
    static ITALIAN = 3;

    constructor() {
        this.current = Language.determineLanguage();
    }

    getCurrent() {
        return this.current;
    }

    static determineLanguage() {
        // return Language.HUNGARIAN;
        // return Language.ITALIAN;

        // Override from GET param?
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('en')) {
            return Language.ENGLISH;
        } else if (searchParams.has('hu')) {
            return Language.HUNGARIAN;
        } else if (searchParams.has('it')) {
            return Language.ITALIAN;
        }

        // Determine by browser language
        let browserLanguage = navigator.language || navigator.userLanguage;
        browserLanguage = browserLanguage.toLowerCase();
        if (browserLanguage.indexOf("it") !== -1) {
            return Language.ITALIAN;
        } else if (browserLanguage.indexOf("hu") !== -1 || browserLanguage.indexOf("de") !== -1) {
            return Language.HUNGARIAN;
        } else {
            return Language.ENGLISH;
        }
    }
}

class Translator {
    constructor(lang) {
        this.lang = lang;
    }

    translatePage() {
        if (this.lang.getCurrent() === Language.ENGLISH) {
            return;
        }

        Object.keys(Data.TRANSLATIONS)
            .forEach(selector => this.translateElement(selector))
    }

    translateElement(selector) {
        let selectionResult = $(selector);
        if (selectionResult.length === 0) {
            console.error(`TRANSLATION ERROR: Could not find: "${selector}"`);
            return;
        }
        else if (selectionResult.length > 1) {
            console.error(`TRANSLATION ERROR: Multiple matches found, only using first: "${selector}"`);
            selectionResult = selectionResult[0];
        }

        let currentLang = this.lang.getCurrent();
        if (!(currentLang in Data.TRANSLATIONS[selector])) {
            console.warn(`TRANSLATION WARNING: There is no translation in "${currentLang}" for selector: "${selector}"`);
            return;
        }

        let translation = Data.TRANSLATIONS[selector][currentLang];
        selectionResult.html(translation);
    }
}

class Data {
    static TRANSLATIONS = {
        // HEADER
        'header .date-text': {
            [Language.HUNGARIAN]: '2024. június 21.',
            [Language.ITALIAN]: '21 Giugno 2024'
        },

        // NAV
        '#nav-ceremony a': {
            [Language.HUNGARIAN]: 'Esküvő',
            [Language.ITALIAN]: 'Cerimonia Religiosa'
        },
        '#nav-celebration a': {
            [Language.HUNGARIAN]: 'Fogadás',
            [Language.ITALIAN]: 'Ristorante'
        },
        '#nav-accomodation a': {
            [Language.HUNGARIAN]: 'Szállás',
            [Language.ITALIAN]: 'Alloggio'
        },
        '#nav-transportation a': {
            [Language.HUNGARIAN]: 'Transzport',
            [Language.ITALIAN]: 'Come arrivare'
        },
        '#nav-rsvp a': {
            [Language.HUNGARIAN]: 'Visszajelzés',
            [Language.ITALIAN]: 'RSVP'
        },
        '#nav-gifts a': {
            [Language.HUNGARIAN]: 'Ajándékok',
            [Language.ITALIAN]: 'Lista nozze'
        },

        // CEREMONY
        '#article-ceremony .article-title': {
            [Language.HUNGARIAN]: 'Esküvő',
            [Language.ITALIAN]: 'Cerimonia Religiosa'
        },
        '#article-ceremony-text1': {
            [Language.HUNGARIAN]: 'A templomi esküvő <span class="highlight">10:30</span>-kor ' +
                'fog kezdődni a <span class="highlight">Chiesa Madre dei Santi Pietro e Paolo</span> ' +
                'templomban, Galatina városában.',
            [Language.ITALIAN]: 'La cerimonia religiosa si terrà ' +
                ' alle <span class="highlight">10:30</span> ' +
                'presso la<span class="highlight">Chiesa Madre dei Santi Pietro e Paolo</span> a Galatina.',
        },

        // CELEBRATION
        '#article-celebration .article-title': {
            [Language.HUNGARIAN]: 'Fogadás',
            [Language.ITALIAN]: 'Ristorante'
        },
        '#article-celebration-text1': {
            [Language.HUNGARIAN]: 'Az esküvő után az ünnepi ebéd pedig a ' +
                '<span class="highlight">Cala Dei Balcani</span>-ban folytatódik Santa Cesarea Terme városában.',
            [Language.ITALIAN]: 'Dopo la cerimonia, i festeggiamenti continueranno presso ' +
                '<span class="highlight">Cala Dei Balcani</span> a Santa Cesarea Terme.',
        },

        // ACCOMODATION
        '#article-accomodation .article-title': {
            [Language.HUNGARIAN]: 'Szállás',
            [Language.ITALIAN]: 'Alloggio'
        },
        '#article-accomodation-text1': {
            [Language.HUNGARIAN]: 'Szállás minden magyar vendégnek biztosítva lesz 3 éjszakára (június 20-23) ' +
                '<span class="highlight">Santa Cesarea Terme</span> városában. Ha szeretnétek tovább maradni egy hosszabb ' +
                'nyaralásra, szóljatok és akkor úgy foglaljuk a szállást hogy a 3 nap után tovább tudjatok maradni ' +
                'ugyanott. <br> ' +
                'Ha autóval érkeznétek, szintén ajánljuk a következő tengerparti városok meglátogatását is:',
            [Language.ITALIAN]: 'Se avete bisogno di un alloggio, vi raccomandiamo i seguenti paesi ' +
                'che hanno tutti una bellissima vista mare: ',
        },
        '#article-accomodation-text2': {
            [Language.HUNGARIAN]: '',
            [Language.ITALIAN]: 'Da notare che Santa Cesarea Terme è il paese in cui si trova ' +
                '<span class="highlight">Cala Dei Balcani</span>.',
        },
        '#article-accomodation-text3': {
            [Language.HUNGARIAN]: '',
            [Language.ITALIAN]: 'In questi paesi non esiste Uber o servizio taxi, ' +
                'che, se richiesto, dovrà invece essere prenotato con anticipo.',
        },

        // TRANSPORTATION
        '#article-transportation .article-title': {
            [Language.HUNGARIAN]: 'Transzport',
            [Language.ITALIAN]: 'Come arrivare'
        },
        '#article-transportation-text1': {
            [Language.HUNGARIAN]: '<span class="highlight">Érkezés repülővel</span>',
            [Language.ITALIAN]: '<span class="highlight">In aereo</span>',
        },
        '#article-transportation-text2': {
            [Language.HUNGARIAN]: 'Külföldről repülővel a legegyszerűbb eljutni az esküvő helyszínére, a legközelebbi repülőtér: ' +
                '<a href="https://maps.app.goo.gl/VTXyV5dDLfGFCfpA8" target="_blank">Brindisi Papola Casale repülőtér (Salento repülőtér)</a> ' +
                'de ha egyszerűbb közvetlen járatot találni, ' +
                '<a href="https://maps.app.goo.gl/Gd6szngYKtTTqkUV9" target="_blank">Bari repülőtér (Bari International Airport-Karol Wojtyla)</a> ' +
                'is még a közelben van.',
            [Language.ITALIAN]: 'È più facile arrivare in Puglia in aereo. ' +
                'L\'aeroporto più vicino si trova a ' +
                '<a href="https://maps.app.goo.gl/VTXyV5dDLfGFCfpA8" target="_blank">Brindisi Papola Casale (Aeroporto del Salento)</a>. ' +
                'Considera anche l\'aeroporto internazionale di ' +
                '<a href="https://maps.app.goo.gl/kUtr6jNGYZjaYxWr7" target="_blank">Bari Karol Wojtyla</a> per voli diretti.'
        },
        '#article-transportation-text3': {
            [Language.HUNGARIAN]: '<span class="highlight">A repülőtértől a szállásig</span>',
            [Language.ITALIAN]: '<span class="highlight">Dall\'aeroporto al tuo alloggio</span>',
        },
        '#article-transportation-text4': {
            [Language.HUNGARIAN]: 'Ha vezetni szeretnétek, van lehetőseg autót bérelni a repülőtéren levő kölcsönző cégektől ' +
                'mindkét repülőtérnél. ' +
                '<br /><br />' +
                'Ha nem vezettek, nem probléma mert június 20-án lesz minibusz bérelve hogy megkönnyítsük a repülőtértől ' +
                'a szállásig való eljutást. Kérjük szóljatok előre hogy mikor és melyik repülőtérre fogtok érkezni, hogy időben érkezzen a minibusz. ' +
                '<br /><br />' +
                'Ha Taxival szeretnétek érkezni, arra is van lehetőség. Ajánljuk a következőket: ' +
                '<a href="https://radio-taxi.it" target="_blank">Radio Taxi</a>, ' +
                '<a href="https://www.moveinpuglia.com/en/" target="_blank">Move in Puglia</a>.',
            [Language.ITALIAN]: 'Possiamo mettere a disposizione una navetta oppure, se hai intezione di affittare una macchina, quella è sicuramente la soluzione migliore per spostarsi in Salento.',
        },
        '#article-transportation-text5': {
            [Language.HUNGARIAN]: '<span class="highlight">A szállástól az esküvői helyszínekig</span>',
            [Language.ITALIAN]: '<span class="highlight">Dal tuo alloggio alla chiesa e al ristorante</span>',
        },
        '#article-transportation-text6': {
            [Language.HUNGARIAN]: 'Ha autóval érkeztek, parkolóhelyet könnyen lehet találni a Galatina templom közelében, például a ' +
                '<a href="https://maps.app.goo.gl/jiMoLQiDJxXYaW7u9" target="_blank">Villa Comunale</a> ' +
                'környékén, valamint úgyszintén a Cala dei Balacani bejáratánál is: ' +
                '<a href="https://maps.app.goo.gl/vTBfVF4oqfAT3TdW6" target="_blank">(40.038093, 18.456934)</a> ' +
                '<br /><br />' +
                'Ha nem vezettek, hasonlóan június 21-én is lesz minibusz szolgáltatás Santa Cesarea Terme és Galatina templom között, tehát autó nem szükséges az esküvő napján sem.',
            [Language.ITALIAN]: 'Se decidi di alloggiare a Santa Cesarea Terme, il giorno del matrimonio metteremo a disposizione una navetta che trasporterà gli invitati dall\'' +
                '<a href="https://maps.app.goo.gl/FTcQDVmqb4zhQbpx5" target="_blank">Hotel Santa Lucia</a> a Galatina (chiesa) e poi a ' +
                '<a href="https://maps.app.goo.gl/ouHGBta5A7eb2sQMA" target="_blank"> Cala dei Balcani</a> a Santa Cesarea Terme (ristorante).'
        },

        // RSVP
        '#article-rsvp .article-title': {
            [Language.HUNGARIAN]: 'Visszajelzés',
            [Language.ITALIAN]: 'R.S.V.P'
        },
        '#article-rsvp-text1': {
            [Language.HUNGARIAN]: 'Kérünk titeket, hogy jelezzetek vissza ' +
                '<span class="highlight-strong">március 30-ig</span> legkésőbb, hogy mindent időben elintézhessünk ' +
                'nektek! Valamint ha speciális étrendre lenne szükségetek (vegetariánus, laktóz-, ' +
                'gluténmentes, stb) kérünk szóljatok előre. ',
            [Language.ITALIAN]: 'È gradita conferma entro ' +
                '<span class="highlight-strong">il 30 marzo</span> ' +
                'così da poter organizzare tutto in tempo per voi! Nella conferma vorremmo anche sapere se ci sono allergie, intolleranze o restrizioni alimentari di cui dobbiamo tener conto. '
        },

        // GIFTS
        '#article-gifts .article-title': {
            [Language.HUNGARIAN]: 'Ajándékok',
            [Language.ITALIAN]: 'Regali'
        },
        '#article-gifts-text1': {
            [Language.HUNGARIAN]: 'Nekünk a jelenlétetek lenne a legnagyobb ajándék, de ha ' +
                'szeretnétek hozzájárulni a Nászút Alapunkhoz nagyon hálásak lennénk!',
            [Language.ITALIAN]: 'La vostra presenza è il regalo più bello di tutti ma, se lo volete,  ' +
                'potete contribuire al nostro fondo per la Luna di Miele, ' +
                've ne saremmo veramente grati!',
        },
        '#gifts-title': {
            [Language.HUNGARIAN]: 'Nászút Alap',
            [Language.ITALIAN]: 'Fondo Luna di Miele'
        },
        '#gifts-account-name': {
            [Language.HUNGARIAN]: 'Számlanév',
            [Language.ITALIAN]: 'Dati beneficiario ' +
                '<br />' +
                '(nome cognome)'
        },
        '#gifts-account-name-value': {
            [Language.HUNGARIAN]: '"Kristof Kotai" vagy "Chiara De Matteis". <br>' +
                '(Ez egy közös számla, egyikünk neve jó lesz)',
            [Language.ITALIAN]: 'È un conto cointestato, use pure<br> "Kristof Kotai" o "Chiara De Matteis"'
        },
        '#gifts-iban': {
            [Language.HUNGARIAN]: 'IBAN',
            [Language.ITALIAN]: 'IBAN'
        },
        '#gifts-bic': {
            [Language.HUNGARIAN]: 'BIC',
            [Language.ITALIAN]: 'BIC'
        },
        '#gifts-bic-value': {
            [Language.HUNGARIAN]: 'SRLGGB2LXXX',
            [Language.ITALIAN]: 'SRLGGB3LXXX'
        },
        '#gifts-bank-name': {
            [Language.HUNGARIAN]: 'Bank neve',
            [Language.ITALIAN]: 'Nome della banca'
        },
        '#gifts-bank-address': {
            [Language.HUNGARIAN]: 'Bank címe',
            [Language.ITALIAN]: 'Indirizzo della Banca'
        },

    };
}
