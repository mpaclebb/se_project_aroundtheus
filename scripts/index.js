const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago Di Braises",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*Elements */

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
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
const closeButtons = document.querySelectorAll(".modal__close");
const modals = [profileEditModal, addCardModal, cardImageModal];

/* Functions */

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", () => {
    cardImageModalImage.src = cardData.link;
    cardImageModalImage.alt = cardData.name;
    cardImageModalTitle.textContent = cardData.name;
    openModal(cardImageModal);
  });

  return cardElement;
}

function renderCard(cardData, list) {
  const cardElement = getCardElement(cardData);
  list.prepend(cardElement);
}

function closeModalByOverlay(evt) {
  closeModal(evt.target);
}

function closeModalByPressingESC(evt) {
  if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

/* Event Handlers */
function handleProfileEditFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
  event.target.reset();
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  event.target.reset();
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

addCardButton.addEventListener("click", () => openModal(addCardModal));

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});
