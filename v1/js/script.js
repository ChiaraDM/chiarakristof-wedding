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
        let browserLanguage = navigator.language || navigator.userLanguage;
        browserLanguage = browserLanguage.toLowerCase();
        // return Language.HUNGARIAN;
        if (browserLanguage.indexOf("hu") !== -1) {
            return Language.HUNGARIAN;
        } else if (browserLanguage.indexOf("it") !== -1) {
            return Language.ITALIAN;
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
            [Language.ITALIAN]: '21st June 2024'
        },

        // NAV
        '#nav-ceremony a': {
            [Language.HUNGARIAN]: 'Ceremónia',
            [Language.ITALIAN]: 'Ceremony'
        },
        '#nav-celebration a': {
            [Language.HUNGARIAN]: 'Fogadás',
            [Language.ITALIAN]: 'Celebration'
        },
        '#nav-accomodation a': {
            [Language.HUNGARIAN]: 'Szállás',
            [Language.ITALIAN]: 'Accomodation'
        },
        '#nav-transportation a': {
            [Language.HUNGARIAN]: 'Transzport',
            [Language.ITALIAN]: 'Transportation'
        },
        '#nav-rsvp a': {
            [Language.HUNGARIAN]: 'Visszajelzés',
            [Language.ITALIAN]: 'RSVP'
        },
        '#nav-gifts a': {
            [Language.HUNGARIAN]: 'Ajándékok',
            [Language.ITALIAN]: 'Gifts'
        },

        // CEREMONY
        '#article-ceremony .article-title': {
            [Language.HUNGARIAN]: 'Ceremónia',
            [Language.ITALIAN]: 'Ceremony'
        },
        '#article-ceremony-text1': {
            [Language.HUNGARIAN]: 'The wedding ceremony will be held ' +
                'at <span class="highlight">10:30 AM</span> ' +
                'at <span class="highlight">Chiesa Madre dei Santi Pietro e Paolo</span>.',
            [Language.ITALIAN]: 'The wedding ceremony will be held ' +
                'at <span class="highlight">10:30 AM</span> ' +
                'at <span class="highlight">Chiesa Madre dei Santi Pietro e Paolo</span>.',
        },

        // CELEBRATION
        '#article-celebration .article-title': {
            [Language.HUNGARIAN]: 'Fogadás',
            [Language.ITALIAN]: 'Celebration'
        },
        '#article-celebration-text1': {
            [Language.HUNGARIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
            [Language.ITALIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
        },

        // ACCOMODATION
        '#article-accomodation .article-title': {
            [Language.HUNGARIAN]: 'Szállás',
            [Language.ITALIAN]: 'Accomodation'
        },
        '#article-accomodation-text1': {
            [Language.HUNGARIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
            [Language.ITALIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
        },
        '#article-accomodation-text2': {
            [Language.HUNGARIAN]: 'The closest to the celebration venue is Santa Cesarea Terme, ' +
                'where <span class="highlight">Cala Dei Balcani</span> is located.',
            [Language.ITALIAN]: 'The closest to the celebration venue is Santa Cesarea Terme, ' +
                'where <span class="highlight">Cala Dei Balcani</span> is located.',
        },
        '#article-accomodation-text3': {
            [Language.HUNGARIAN]: 'Note, that within these towns there is no Uber or on-demand Taxi service. ' +
                'Taxi journeys need to be prebooked.',
            [Language.ITALIAN]: 'Note, that within these towns there is no Uber or on-demand Taxi service. ' +
                'Taxi journeys need to be prebooked.',
        },

        // TRANSPORTATION
        '#article-transportation .article-title': {
            [Language.HUNGARIAN]: 'Transzport',
            [Language.ITALIAN]: 'Transportation'
        },
        '#article-transportation-text1': {
            [Language.HUNGARIAN]: '<span class="highlight">Arriving by plane</span>',
            [Language.ITALIAN]: '<span class="highlight">Arriving by plane</span>',
        },
        '#article-transportation-text2': {
            [Language.HUNGARIAN]: 'Getting to the wedding venue from abroad is easiest by plane. ' +
                'The closest airport is: ' +
                '<a href="https://maps.app.goo.gl/VTXyV5dDLfGFCfpA8" target="_blank">Brindisi Papola Casale Airport (Salento Airport)</a>.',
            [Language.ITALIAN]: 'Getting to the wedding venue from abroad is easiest by plane. ' +
                'The closest airport is: ' +
                '<a href="https://maps.app.goo.gl/VTXyV5dDLfGFCfpA8" target="_blank">Brindisi Papola Casale Airport (Salento Airport)</a>.',
        },
        '#article-transportation-text3': {
            [Language.HUNGARIAN]: '<span class="highlight">From the airport to your accomodation</span>',
            [Language.ITALIAN]: '<span class="highlight">From the airport to your accomodation</span>',
        },
        '#article-transportation-text4': {
            [Language.HUNGARIAN]: 'TODO',
            [Language.ITALIAN]: 'TODO',
        },
        '#article-transportation-text5': {
            [Language.HUNGARIAN]: '<span class="highlight">From your accomodation to the wedding venues</span>',
            [Language.ITALIAN]: '<span class="highlight">From your accomodation to the wedding venues</span>',
        },
        '#article-transportation-text6': {
            [Language.HUNGARIAN]: 'TODO',
            [Language.ITALIAN]: 'TODO',
        },

        // RSVP
        '#article-rsvp .article-title': {
            [Language.HUNGARIAN]: 'Visszajelzés',
            [Language.ITALIAN]: 'R.S.V.P'
        },
        '#article-rsvp-text1': {
            [Language.HUNGARIAN]: 'Please confirm your presence to either of us, by ' +
                '<span class="highlight-strong">30th March</span> ' +
                'so we can arrange everything in time for you! And let us ' +
                'know if you have any dietary requirements ' +
                '(vegetarian, lactose free, etc.)',
            [Language.ITALIAN]: 'Please confirm your presence to either of us, by ' +
                '<span class="highlight-strong">30th March</span> ' +
                'so we can arrange everything in time for you! And let us ' +
                'know if you have any dietary requirements ' +
                '(vegetarian, lactose free, etc.)',
        },

        // GIFTS
        '#article-gifts .article-title': {
            [Language.HUNGARIAN]: 'Ajándékok',
            [Language.ITALIAN]: 'Gifts'
        },
        '#article-gifts-text1': {
            [Language.HUNGARIAN]: 'Your presence is the most important gift of all, but if you ' +
                'would like to contribute to our Honeymoon Fund, ' +
                'we would be so grateful!',
            [Language.ITALIAN]: 'Your presence is the most important gift of all, but if you ' +
                'would like to contribute to our Honeymoon Fund, ' +
                'we would be so grateful!',
        },
        '#gifts-title': {
            [Language.HUNGARIAN]: 'Nászút alap',
            [Language.ITALIAN]: 'Honeymoon Fund'
        },
        '#gifts-account-name': {
            [Language.HUNGARIAN]: 'Számlanév',
            [Language.ITALIAN]: 'Account name'
        },
        '#gifts-account-name-value': {
            [Language.HUNGARIAN]: 'Use either "Kristof Kotai"<br> or "Chiara De Matteis"',
            [Language.ITALIAN]: 'Use either "Kristof Kotai"<br> or "Chiara De Matteis"'
        },
        '#gifts-iban': {
            [Language.HUNGARIAN]: 'IBAN',
            [Language.ITALIAN]: 'IBAN'
        },
        '#gifts-bic': {
            [Language.HUNGARIAN]: 'BIC',
            [Language.ITALIAN]: 'BIC'
        },
        '#gifts-bank-name': {
            [Language.HUNGARIAN]: 'Bank neve',
            [Language.ITALIAN]: 'Bank name'
        },
        '#gifts-bank-address': {
            [Language.HUNGARIAN]: 'Bank címe',
            [Language.ITALIAN]: 'Bank address'
        },

    };
}
