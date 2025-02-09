/*Elements */

// const profileEditButton = document.querySelector(".profile__edit-button");
// const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");
// const profileTitleInput = document.querySelector("#profile-title-input");
// const profileDescriptionInput = document.querySelector( "#profile-description-input");
// const profileEditForm = document.forms["profile-edit-form"];
// const cardListEl = document.querySelector(".cards__list");
// const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
// const addCardButton = document.querySelector(".profile__add-button");
// const addCardModal = document.querySelector("#add-card-modal");
// const cardTitleInput = document.querySelector(".modal__input_type_title");
// const cardLinkInput = document.querySelector(".modal__input_type_link");
// const addCardForm = document.forms["add-card-form"];
// const cardImageModal = document.querySelector("#card-image-modal");
// const cardImageModalImage = document.querySelector("#modal-image");
//const cardImageModalTitle = document.querySelector("#modal-title");
//const closeButtons = document.querySelectorAll(".modal__close");
// const modals = [profileEditModal, addCardModal, cardImageModal];
// const cardSelector = "#card-template";

/* Functions */

// function createCard(cardData) {
//  const card = new Card(cardData, cardSelector, handleImageClick);
//  return card.getView();
// }

//const renderCard = (cardData, cardListEl) => {
// const cardElement = createCard(cardData);
// cardListEl.prepend(cardElement);
// };

// function openModal(modal) {
// modal.classList.add("modal_opened");
// document.addEventListener("keydown", closeModalByPressingESC);
// modal.addEventListener("click", closeModalByOverlay);
// }

// function closeModal(modal) {
// modal.classList.remove("modal_opened");
// document.removeEventListener("keydown", closeModalByPressingESC);
// modal.removeEventListener("click", closeModalByOverlay);
// }

// function closeModalByOverlay(evt) {
// if (evt.target === evt.currentTarget) {
//  closeModal(evt.currentTarget);
//  }
// }

// function closeModalByPressingESC(evt) {
// console.log("Key pressed: ", evt.key);
// if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
//   const modal = document.querySelector(".modal_opened");
//    closeModal(modal);
//  }
// }

/* Event Handlers */

// function handleImageClick(cardData) {
// cardImageModalImage.src = cardData.link;
// cardImageModalImage.alt = cardData.name;
// cardImageModalTitle.textContent = cardData.name;
// openModal(cardImageModal);
// }

//  function handleProfileEditFormSubmit(event) {
//  event.preventDefault();
//  console.log("Profile Edit Form Submit");
//  profileTitle.textContent = profileTitleInput.value;
//  profileDescription.textContent = profileDescriptionInput.value;
//  closeModal(profileEditModal);
//  event.target.reset();
// }

// function handleAddCardFormSubmit(event) {
//  event.preventDefault();
//  console.log("Add card Form Submit");
//  const name = cardTitleInput.value;
//  const link = cardLinkInput.value;
//  renderCard({ name, link }, cardListEl);
//  closeModal(addCardModal);
//  addFormValidator.disableButton();
//  event.target.reset();
// }

/* Event Listeners */
// profileEditButton.addEventListener("click", () => {
// const userInput = user.getUserInfor();
// profileTitleInput.value = profileTitle.textContent;
// profileDescriptionInput.value = profileDescription.textContent;
// openModal(profileEditModal);
// });

// profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

// addCardButton.addEventListener("click", () => openModal(addCardModal));

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// closeButtons.forEach((button) => {
//   const modal = button.closest(".modal");
//  button.addEventListener("click", () => closeModal(modal));
// });
