import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
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
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithDelete from "../components/PopupWithDelete.js";

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

userData.setUserInfo({ name: 'Имя Пользователя', about: 'Описание профиля' });
userData.setUserAvatar('./images/placeholder.jpg');

const popupWithImage = new PopupWithImage(".popup_type_image-overlay");
popupWithImage.setEventListeners();

const popupWithDelete = new PopupWithDelete(".popup_type_delete-card", (card) => {
  card.removeCardElement();
  popupWithDelete.close();
});
popupWithDelete.setEventListeners();

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

// Обработка попапа редактирования профиля
const popupEditProfile = new PopupWithForm(".popup_type_profile", (formData) => {
  userData.setUserInfo({
    name: formData["username"],
    about: formData["occupation"],
  });
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUser = userData.getUserInfo();
  nameInput.value = currentUser.name;
  jobInput.value = currentUser.about;
  popupEditProfile.open();
});

// Отрисовка карточек из constants.js
const cardSection = new Section(
  {
    items: initialCards.map(card => ({ ...card, owner: { _id: userId } })),
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardSection.addItem(card);
    },
  },
  ".grid-net"
);
cardSection.renderItems();

const popupAddCard = new PopupWithForm(".popup_type_create-card", (formData) => {
  const newCardData = {
    name: formData["name"],
    link: formData["link"],
    owner: { _id: userId },
  };
  const newCard = createCard(newCardData);
  cardSection.addItem(newCard);
  popupAddCard.close();
});
popupAddCard.setEventListeners();

profileButton.addEventListener("click", () => {
  popupAddCard.open();
});

const popupAvatar = new PopupWithForm(".popup_type_profile-avatar", (formData) => {
  userData.setUserAvatar(formData["avatar"]);
  popupAvatar.close();
});
popupAvatar.setEventListeners();

avatarButton.addEventListener("click", () => {
  popupAvatar.open();
});

