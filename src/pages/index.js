import "../pages/index.css";

//imports

import {
  initialCards,
  cardSelectors,
  settings,
  profileEditButton,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardButton,
  addCardForm,
} from "../utils/constants.js";
console.log("initial Cards:", initialCards);

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//instantiate
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      console.log("Rendering card with data:", data);
      section.addItem(createCard(data));
    },
  },

  cardSelectors.cardListEl
);

const newCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);

const editProfileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileEditFormSubmit
);

const imageModal = new ModalWithImage(cardSelectors.previewModal);

const user = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

//initializie instances
console.log("Initial Cards before rendering", initialCards);
section.renderItems(initialCards);
imageModal.setEventListeners();
newCardModal.setEventListeners();
editProfileModal.setEventListeners();

/*Validation*/

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* Functions */

function createCard(data) {
  console.log("Card Data Passed to createCard:", data); // Debug log

  const card = new Card(data, cardSelectors.cardTemplate, (data) => {
    imageModal.open(data);
  });
  return card.getView();
}

/* Event Handlers */

function handleProfileEditFormSubmit(profileData) {
  console.log("Profile Edit Form Submit");
  const name = profileData.title;
  const description = profileData.description;
  user.setUserInfor({ name, description });
  editProfileModal.close();
}

function handleAddCardFormSubmit(newCardData) {
  console.log(newCardData);
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.link;
  section.addItem(createCard({ name, alt, link }));
  newCardModal.close();
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileDescriptionInput.value = userInput.bio;
  editProfileModal.open();
  //editFormValidator._toggleButtonState();
});

// profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

addCardButton.addEventListener("click", () => {
  newCardModal.open();
  addFormValidator.resetValidation();
});

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//  button.addEventListener("click", () => closeModal(modal));
// });
