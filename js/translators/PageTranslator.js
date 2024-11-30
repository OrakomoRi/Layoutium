class PageTranslator {
	constructor() {
		this.translations = {};
		this.currentLanguage = localStorage.getItem('language') || 'en';
	}

	/**
	 * Load translations from a JSON file for the given language
	 * @param {string} language Language code (e.g., 'en', 'ru')
	 */
	async loadTranslations(language) {
		try {
			const response = await fetch(`/data/translations/${language}.json`);
			this.translations = await response.json();
			this.currentLanguage = language;
			localStorage.setItem('language', language);
		} catch (error) {
			console.error('Error loading translations:', error);
		}
	}

	/**
	 * Get translation for a specific key
	 * @param {string} key Translation key
	 * @returns {string} Translated text or the key itself if no translation is found
	 */
	getTranslation(key) {
		return this.translations[key] || key;
	}

	/**
	 * Update text on the page based on the current translations
	 */
	updateTranslations() {
		document.querySelectorAll('[data-i18n]').forEach((el) => {
			const key = el.dataset.i18n;
			if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
				el.placeholder = this.getTranslation(key);
			} else {
				el.textContent = this.getTranslation(key);
			}
		});
	}

	/**
	 * Initialize the language selector and set up event listeners
	 * @param {Array} languages Array of language options with codes and names
	 */
	setupLanguageSelect(languages) {
		const selectorContainer = document.querySelector('.breezeum-select.languages');

		const options = languages.map((language) => ({
			name: language.code, // Uses `code` instead of `name`
			code: language.code,
		}));

		new BreeziumSelect(
			selectorContainer,
			options,
			async (language) => {
				await this.changeLanguage(language);
			},
			languages.find((lang) => lang.code === this.currentLanguage)?.code
		);
	}

	/**
	 * Change the current language and update translations on the page
	 * @param {string} language Language code to switch to
	 */
	async changeLanguage(language) {
		await this.loadTranslations(language);
		this.updateTranslations();
	}

	/**
	 * Initialize the page translator
	 */
	async init() {
		try {
			const response = await fetch('/data/languages.json');
			const languages = await response.json();

			await this.changeLanguage(this.currentLanguage);
			this.setupLanguageSelect(languages);
		} catch (error) {
			console.error('Error initializing PageTranslator:', error);
		}
	}
}