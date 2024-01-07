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
            [Language.ITALIAN]:   '21st June 2024'
        },

        // NAV
        '#nav-ceremony a': {
            [Language.HUNGARIAN]: 'Ceremónia',
            [Language.ITALIAN]:   'Ceremony'
        },
        '#nav-celebration a': {
            [Language.HUNGARIAN]: 'Fogadás',
            [Language.ITALIAN]:   'Celebration'
        },
        '#nav-accomodation a': {
            [Language.HUNGARIAN]: 'Szállás',
            [Language.ITALIAN]:   'Accomodation'
        },
        '#nav-transportation a': {
            [Language.HUNGARIAN]: 'Transzport',
            [Language.ITALIAN]:   'Transportation'
        },
        '#nav-rsvp a': {
            [Language.HUNGARIAN]: 'Visszajelzés',
            [Language.ITALIAN]:   'RSVP'
        },
        '#nav-gifts a': {
            [Language.HUNGARIAN]: 'Ajandékok',
            [Language.ITALIAN]:   'Gifts'
        },

        // CEREMONY
        '#article-ceremony .article-title': {
            [Language.HUNGARIAN]: 'Ceremónia',
            [Language.ITALIAN]:   'Ceremony'
        },
        '#article-ceremony .article-text': {
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
            [Language.ITALIAN]:   'Celebration'
        },
        '#article-celebration .article-text': {
            [Language.HUNGARIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
            [Language.ITALIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
        },
        
        // ACCOMODATION
        '#article-accomodation .article-title': {
            [Language.HUNGARIAN]: 'Szállás',
            [Language.ITALIAN]:   'Accomodation'
        },
        '#article-accomodation .article-text:nth-of-type(1)': {
            [Language.HUNGARIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
            [Language.ITALIAN]: 'After the ceremony, the celebration will continue ' +
                'at <span class="highlight">Cala Dei Balcani</span>.',
        },
        '#article-accomodation .article-text:nth-of-type(2)': {
            [Language.HUNGARIAN]: 'The closest to the celebration venue is Santa Cesarea Terme, ' +
                'where <span class="highlight">Cala Dei Balcani</span> is located.',
            [Language.ITALIAN]: 'The closest to the celebration venue is Santa Cesarea Terme, ' +
            'where <span class="highlight">Cala Dei Balcani</span> is located.',
        },
        '#article-accomodation .article-text:nth-of-type(3)': {
            [Language.HUNGARIAN]: 'Note, that within these towns there is no Uber or on-demand Taxi service.' +
                'Taxi journeys need to be prebooked.',
            [Language.ITALIAN]: 'Note, that within these towns there is no Uber or on-demand Taxi service.' +
                'Taxi journeys need to be prebooked.',
        },

        // TRANSPORTATION

        
        // RSVP


        // GIFTS


    };
}
