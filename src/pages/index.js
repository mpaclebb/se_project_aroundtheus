import "../pages/index.css";

//imports

import { initialCards, cardSelectors, settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//constants

const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.forms["profile-edit-form"];
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardLinkInput = document.querySelector(".modal__input_type_link");
const addCardForm = document.forms["add-card-form"];
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageModalImage = document.querySelector("#modal-image");
const cardImageModalTitle = document.querySelector("#modal-title");

//instantiate
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
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

const cardPreviewModal = new ModalWithImage(cardSelectors.previewModal);

const user = new UserInfo({
  name: ".profile__title",
  bio: ".profile__bio",
});

//initializie instances
section.renderItems(initialCards);
cardPreviewModal.setEventListeners;
/*Validation*/

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* Functions */

function createCard(data) {
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

const renderCard = (cardData, cardListEl) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
};

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByPressingESC);
  modal.addEventListener("click", closeModalByOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByPressingESC);
  modal.removeEventListener("click", closeModalByOverlay);
}

function closeModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModalByPressingESC(evt) {
  console.log("Key pressed: ", evt.key);
  if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

/* Event Handlers */

function handleImageClick(cardData) {
  cardImageModalImage.src = cardData.link;
  cardImageModalImage.alt = cardData.name;
  cardImageModalTitle.textContent = cardData.name;
  openModal(cardImageModal);
}

function handleProfileEditFormSubmit(event) {
  event.preventDefault();
  console.log("Profile Edit Form Submit");
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  event.target.reset();
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
