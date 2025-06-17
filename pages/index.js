import { Card } from "../components/Card.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileButton,
  profileEditButton,
  nameInput,
  jobInput,
  config,
  avatarButton,
  initialCards
} from "../utils/constants.js";

const userId = 'demo-user';

const profileValidator = new FormValidator(config, document.querySelector(".popup_type_profile"));
profileValidator.enableValidation();

const addCardValidator = new FormValidator(config, document.querySelector(".popup_type_create-card"));
addCardValidator.enableValidation();

const profileAvatarValidator = new FormValidator(config, document.querySelector(".popup_type_profile-avatar"));
profileAvatarValidator.enableValidation();

const userData = new UserInfo({
  nameSelector: ".profile__info-fullname",
  aboutSelector: ".profile__info-occupation",
  avatarSelector: ".profile__avatar",
});

userData.setUserInfo({ name: 'Имя', about: 'Описание профиля' });
userData.setUserAvatar('./images/placeholder.jpg');

function createCard(cardData) {
  const newCard = new Card(
    cardData,
    userId,
    cardData.owner,
    "#template-card",
    popupWithImage.open.bind(popupWithImage),
    popupWithDelete.open,
    (likeElement, cardId, cardInstance) => {
      cardInstance.toggleLikeManually();
      likeElement.classList.remove("grid-net__item-button_active");
      
    }
  );
  return newCard.generateCard();
}

