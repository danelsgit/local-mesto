class Card {
  constructor(card, userId, cardAuthor, templateSelector, handleCardClick, handleCardDelete, handleLikeClick) {
    (this._title = card.name),
      (this._link = card.link),
      (this._likes = card.likes),
      (this._templateSelector = templateSelector),
      (this._handleCardClick = handleCardClick),
      (this._handleCardDelete = handleCardDelete),
      (this._handleLikeClick = handleLikeClick),
      (this._cloneCard = document.querySelector(this._templateSelector).content.querySelector('.grid-net__item').cloneNode(true)),
      (this._imageElement = this._cloneCard.querySelector('.grid-net__item-image')),
      (this._likeElement = this._cloneCard.querySelector('.grid-net__item-button')),
      (this._deleteButton = this._cloneCard.querySelector('.grid-net__item-button-delete')),
      (this._cardSpan = this._cloneCard.querySelector('.grid-net__item-number')),
      (this._likesLength = this._likes.length),
      (this._cardId = card._id),
      (this._userId = userId),
      (this._cardOwner = cardAuthor.author)
  }

  _getTemplate() {
    return this._cloneCard;
  }

  _handleDeleteCard = () => { 
this._handleCardDelete(this)
  }

  _handleOpenPopup = () => {
    this._handleCardClick({ name: this._title, link: this._link });
  };

  _handleLike = () => { 
   this._handleLikeClick(this._likeElement, this._cardId)
  }

  _setEventListeners() {
    (this._element = this._getTemplate()),
    this._imageElement.addEventListener("click", this._handleOpenPopup);
    this._likeElement.addEventListener("click", this._handleLike)

    if(this._userId === this._cardOwner){
    this._deleteButton.addEventListener("click", this._handleDeleteCard)
    }
    else { 
      this._deleteButton.remove()
    }
    }

    likeToggle(likes){
      this._likeElement.classList.toggle('grid-net__item-button_active'),
      this._cardSpan.textContent = likes.length
    }
  
    removeCardElement() { 
      this._element.remove()
    }

    _checkLikeStatus(){ 
      this._likes.forEach( item => { 
        if(item._id === this._userId){
          this._likeElement.classList.add('grid-net__item-button_active')
          return
        }
      })
    this._cardSpan.textContent = this._likesLength;
    }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._imageElement.src = this._link;
    this._element.querySelector(".grid-net__item-title").textContent =
      this._title;
      this._checkLikeStatus()

    this._imageElement.alt = this._title;
    return this._element;
  }
}

export { Card };
