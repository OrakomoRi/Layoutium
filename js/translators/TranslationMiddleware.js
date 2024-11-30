const TranslationMiddleware = {
	// Updating the translation when changing the interface language
	async handleLanguageChange(language) {
		await pageTranslator.changeLanguage(language); // Use TranslationController to handle language change
		this.updatePlaceholders(); // Update text prompts in input/textarea
	},

	// Updating text translation when changing direction
	handleDirectionChange(direction) {
		textTranslator.setDirection(direction); // Update translation direction
		this.updatePlaceholders();
		textTranslator.retranslateText(); // Start re-translating the current text
	},

	/**
	 * Update placeholder text based on the current translation direction
	 */
	updatePlaceholders() {
		const inputTextArea = document.getElementById('inputText');
		inputTextArea.setAttribute(
			'data-i18n',
			textTranslator.direction === 'enToRu'
				? 'Enter text in English layout...'
				: 'Enter text in Russian layout...'
		);
		
		pageTranslator.updateTranslations();
	},
};

document.addEventListener('DOMContentLoaded', () => {
	TranslationMiddleware.updatePlaceholders();
});
