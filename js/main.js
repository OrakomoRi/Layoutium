// main.js

// Initialize the TextTranslator instance
const textTranslator = new TextTranslator();

// Initialize the PageTranslator instance
const pageTranslator = new PageTranslator();

// When the DOM is loaded, initialize the components
document.addEventListener('DOMContentLoaded', async () => {
	// Initialize TextTranslator (loading layouts, setting initial direction)
	await textTranslator.init();

	// Initialize PageTranslator (loading translations, setting initial language)
	await pageTranslator.init();
});
