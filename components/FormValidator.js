class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._formInputElements = Array.from(
      this._formElement.querySelectorAll(this._config.inputElement)
    );
    this._formSubmitElement = this._formElement.querySelector(
      this._config.buttonElement
    );
  }

  enableValidation() {
    this.toggleStateButton();
    this._setEventListeners();
  }

  _setEventListeners() {
    this._formInputElements.forEach((item) => {
      item.addEventListener("input", () => {
        this._checkInputValidity(item);
        this.toggleStateButton();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  toggleStateButton() {
    if (this._checkInputInvalidity()) {
      this._formSubmitElement.classList.add(this._config.inactiveButtonClass);
      this._formSubmitElement.setAttribute("disabled", "");
    } else {
      this._formSubmitElement.classList.remove(
        this._config.inactiveButtonClass
      );
      this._formSubmitElement.removeAttribute("disabled");
    }
  }

  _checkInputInvalidity() {
    return this._formInputElements.some((input) => {
      return !input.validity.valid;
    });
  }
}

export { FormValidator };
