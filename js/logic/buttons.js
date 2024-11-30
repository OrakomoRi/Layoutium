const ButtonsController = {
	// Clear textarea
	clearTextAreas() {
		document.getElementById('inputText').value = '';
		document.getElementById('outputText').value = '';
	},

	// Switching the translation direction
	swapLanguages() {
		const newDirection = textTranslator.direction === 'enToRu' ? 'ruToEn' : 'enToRu';
		TranslationMiddleware.handleDirectionChange(newDirection);

		// Translation trigger
		const inputTextArea = document.getElementById('inputText');
		const inputText = inputTextArea.value;
		const translatedText = textTranslator.translateText(inputText);
		document.getElementById('outputText').value = translatedText;
	},

	// Button initialization
	init() {
		document.querySelector('.clear-btn').addEventListener('click', this.clearTextAreas);
		document.querySelector('.swap-btn').addEventListener('click', this.swapLanguages.bind(this));
	},
};

// Button initialization
document.addEventListener('DOMContentLoaded', () => {
	ButtonsController.init();
});