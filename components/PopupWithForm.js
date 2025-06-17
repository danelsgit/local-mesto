import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formCallBack) {
    super(popupSelector);
    this._formCallBack = formCallBack;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
    this._sendButton = this._popup.querySelector(".popup__submit");
    this._sendButtonText = this._sendButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setButtonText() {
    this._sendButton.textContent = "Сохранение...";
  }

  resetButtonText() {
    this._sendButton.textContent = this._sendButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formCallBack(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}