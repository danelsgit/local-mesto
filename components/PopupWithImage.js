import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupDescription = this._popup.querySelector(".popup__span");
    this._popupImage = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    super.open();
    this._popupDescription.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;
  }
}