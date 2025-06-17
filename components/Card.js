export class Card {
  constructor(card, userId, cardAuthor, templateSelector, handleCardClick, handleCardDelete, handleLikeClick) {
    this._title = card.name;
    this._link = card.link;
    this._likes = 0;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._cloneCard = document.querySelector(this._templateSelector).content.querySelector('.grid-net__item').cloneNode(true);
    this._imageElement = this._cloneCard.querySelector('.grid-net__item-image');
    this._likeElement = this._cloneCard.querySelector('.grid-net__item-button');
    this._deleteButton = this._cloneCard.querySelector('.grid-net__item-button-delete');
    this._cardSpan = this._cloneCard.querySelector('.grid-net__item-number');
    this._cardId = card._id;
    this._userId = userId;
    this._cardAuthor = cardAuthor;
    this._isLiked = false;
  }

  generateCard() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;
    this._cloneCard.querySelector('.grid-net__item-title').textContent = this._title;
    this._cardSpan.textContent = this._likes;

    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });

    this._likeElement.addEventListener('click', () => {
      this.toggleLikeManually();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });

    return this._cloneCard;
  }

  toggleLikeManually() {
    this._isLiked = !this._isLiked;
    if (this._isLiked) {
      this._likeElement.classList.add("grid-net__item-button_active");
      this._likes++;
    } else {
      this._likeElement.classList.remove("grid-net__item-button_active");
      this._likes = Math.max(0, this._likes - 1);
    }
    this._cardSpan.textContent = this._likes;
  }

  removeCardElement() {
    this._cloneCard.remove();
    this._cloneCard = null;
  }
}