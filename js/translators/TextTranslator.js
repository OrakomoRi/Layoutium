class TextTranslator {
	constructor() {
		this.layouts = {};
		this.direction = localStorage.getItem('direction') || 'enToRu';
	}

	/**
	 * Load keyboard layouts from a JSON file
	 */
	async loadLayouts() {
		try {
			const response = await fetch('/data/layouts.json');
			this.layouts = await response.json();
		} catch (error) {
			console.error('Error loading layouts:', error);
		}
	}

	/**
	 * Set the translation direction
	 * @param {string} newDirection Direction code (e.g., 'enToRu' or 'ruToEn')
	 */
	setDirection(newDirection) {
		this.direction = newDirection;
		localStorage.setItem('direction', newDirection);
	}

	/**
	 * Re-translate the text based on the current direction
	 */
	retranslateText() {
		const inputTextArea = document.getElementById('inputText');
		const outputTextArea = document.getElementById('outputText');

		const inputText = inputTextArea.value;
		const translatedText = this.translateText(inputText);
		outputTextArea.value = translatedText;
	}

	/**
	 * Translate text based on the current layout and direction
	 * @param {string} inputText Text to be translated
	 * @returns {string} Translated text
	 */
	translateText(inputText) {
		const layout = this.layouts[this.direction];
		return inputText
			.split('')
			.map((char) => layout[char] || char)
			.join('');
	}

	/**
	 * Handle input in the text area and translate text in real time
	 * @param {Event} event Input event
	 */
	handleInput(event) {
		const outputTextArea = document.getElementById('outputText');
		const translatedText = this.translateText(event.target.value);
		outputTextArea.value = translatedText;
	}

	/**
	 * Initialize the text translator, load layouts, and set up event listeners
	 */
	async init() {
		await this.loadLayouts();

		const inputTextArea = document.getElementById('inputText');
		inputTextArea.addEventListener('input', this.handleInput.bind(this));

		this.setDirection(this.direction);
	}
}