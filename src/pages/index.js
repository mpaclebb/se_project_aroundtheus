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
  bio: ".profile__bio",
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

  const card = new Card(
    {
      data,
      handleImageClick: () => {
        imageModal.open(data);
      },
    },
    cardSelectors.cardTemplate
  );
  return card.getView();
}

/* Event Handlers */

function handleProfileEditFormSubmit(profiledata) {
  console.log("Profile Edit Form Submit");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  console.log("Add card Form Submit");
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addFormValidator.disableButton();
  event.target.reset();
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfor();
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

// profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//  button.addEventListener("click", () => closeModal(modal));
// });
