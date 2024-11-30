/**
 * Universal class to create custom selects
 * @param {HTMLElement} container Parent element of the future select
 * @param {Array} options Array of objects with `name` and `code` properties for options: [{name, value}, {name, value}]
 * @param {Function} callback Function triggered when an option is selected
 * @param {string|null} defaultValue Default value displayed before selecting an option
 */
class BreeziumSelect {
	constructor(container, options, callback, defaultValue = null) {
		this.container = container;
		this.options = options;
		this.callback = callback;
		this.defaultValue = defaultValue || options[0]?.name || 'Select Option';

		this.selected = null;
		this.optionsContainer = null;

		this.init();
	}

	/**
	 * Initializes the custom select by creating DOM elements and attaching event listeners
	 */
	init() {
		this.selected = document.createElement('div');
		this.selected.classList.add('breezeum-selected');
		this.selected.textContent = this.defaultValue;

		this.optionsContainer = document.createElement('div');
		this.optionsContainer.classList.add('breezeum-options');

		this.options.forEach((option) => {
			const optionEl = document.createElement('div');
			optionEl.classList.add('breezeum-option');
			optionEl.textContent = option.name;
			optionEl.dataset.value = option.code;

			optionEl.addEventListener('click', () => this.selectOption(option));

			this.optionsContainer.appendChild(optionEl);
		});

		this.selected.addEventListener('click', () => this.toggleOptions());

		document.addEventListener('click', (event) => {
			if (!this.container.contains(event.target)) {
				this.container.classList.remove('show');
			}
		});

		// Добавляем элементы в контейнер
		this.container.appendChild(this.selected);
		this.container.appendChild(this.optionsContainer);
	}

	/**
	 * Handles the selection of an option
	 * @param {object} option The selected option {name, value}
	 */
	selectOption(option) {
		console.log(option);
		this.callback(option.code);
		this.selected.textContent = option.name;
		this.container.classList.remove('show');
	}
	/**
	 * Toggles the visibility of the options list
	 */
	toggleOptions() {
		this.container.classList.toggle('show');
	}
}