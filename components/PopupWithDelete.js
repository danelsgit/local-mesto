import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, callBackSubmit) {
    super(popupSelector);
    (this._callBackSubmit = () => callBackSubmit(this._card)),
      (this._confirmButton = this._popup.querySelector(".popup__submit"));
  }

  open = (card) => {
    super.open();
    this._card = card;
  };

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._callBackSubmit);
  }
}
