import "../pages/index.css";

//imports

import {
  cardSelectors,
  settings,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardButton,
  addCardForm,
  changeAvatarButton,
  changeAvatarForm,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

//API
const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f2352e83-00f2-4fed-84a7-f485841f4242",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    user.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    user.changeAvatarImage(userData.avatar);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error("Failed to load app info: ${err}");
  });

//instantiate
const section = new Section(
  {
    renderer: (data) => {
      console.log("Rendering card with data:", data);
      section.addItem(createCard(data));
    },
  },

  cardSelectors.cardListEl
);

const newCardModal = new ModalWithForm({
  modalSelector: "#add-card-modal",
  handleFormSubmit: (data) => {
    newCardModal.renderLoading(true);
    api
      .addCard({
        name: data.title,
        link: data.link,
      })
      .then((data) => {
        section.addItem(createCard(data));
        newCardModal.close();
      })
      .catch(console.error)
      .finally(() => {
        newCardModal.renderLoading(false);
      });
  },
});

const editProfileModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: (data) => {
    editProfileModal.renderLoading(true);

    api
      .editProfile({
        name: data.title,
        about: data.bio,
      })
      .then((data) => {
        user.setUserInfo({ name: data.name, description: data.about });
        editProfileModal.close();
      })
      .catch(console.error)
      .finally(() => {
        editProfileModal.renderLoading(false);
      });
  },
});

const confirmDeleteModal = new ModalWithForm({
  modalSelector: "#confirm-delete-modal",
  handleFormSubmit: confirmDeleteCard,
});

//test//

// const confirmDeleteModal = new ModalWithForm({
//   modalSelector: "#confirm-delete-modal",
//   handleFormSubmit: confirmDeleteCard,
// });

const changeAvatarModal = new ModalWithForm({
  modalSelector: "#change-avatar-modal",
  handleFormSubmit: (data) => {
    changeAvatarModal.renderLoading(true);
    api
      .changeAvatar(data.link)
      .then((userData) => {
        user.changeAvatarImage(userData.avatar);
        changeAvatarModal.close();
      })
      .catch(console.error)
      .finally(() => {
        changeAvatarModal.renderLoading(false);
      });
  },
});

const imageModal = new ModalWithImage(cardSelectors.previewModal);

const user = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
  avatar:".profile__image",
});

//initializie instances
// console.log("Initial Cards before rendering", initialCards);
//  section.renderItems(cards);
imageModal.setEventListeners();
newCardModal.setEventListeners();
editProfileModal.setEventListeners();
confirmDeleteModal.setEventListeners();
changeAvatarModal.setEventListeners();

/*Validation*/

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
const changeAvatarFormValidator = new FormValidator(settings, changeAvatarForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

/* Functions */

function createCard(data) {
  console.log("Card Data Passed to createCard:", data); // Debug log

  const card = new Card(
    {
      data,
      handleImageClick: () => {
        imageModal.open(data);
      },
      handleLikeClick: (card) => {
        api
          .likeCardStatus(card.getID(), !card._isLiked)
          .then((data) => {
            card.handleLike(data.isLiked);
          })
          .catch(console.error);
      },
      handleDeleteCardClick: confirmDeleteCard,
      //handle card click
      //handle like click
      //handle delete icon click
    },
    cardSelectors.cardTemplate,
  );

  return card.getView();
}

function confirmDeleteCard(cardData) {
  confirmDeleteModal.open();
  confirmDeleteModal.setSubmitHandler(() => {
    api
      .deleteCard(cardData.getID())
      .then(() => {
        cardData.handleDeleteCard();
        confirmDeleteModal.close();
      })
      .catch(console.error);
  });
}



/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileDescriptionInput.value = userInput.bio;
  editProfileModal.open();
  editFormValidator.resetValidation();
  //editFormValidator._toggleButtonState();
});

// profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

addCardButton.addEventListener("click", () => {
  newCardModal.open();
  addFormValidator.resetValidation();
});

changeAvatarButton.addEventListener("click", () => {
  changeAvatarModal.open();

  changeAvatarFormValidator.resetValidation();
});
// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//  button.addEventListener("click", () => closeModal(modal));
// });
