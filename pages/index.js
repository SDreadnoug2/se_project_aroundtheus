import { cardListEl, initialCards } from "../utils/constants.js";
import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import UserInfo from "../Components/UserInfo.js";
// Add Modal ---------------------------------------------------- //
const addButton = document.querySelector(".profile__add-button");
const addModalBox = document.querySelector("#AddPlaceModal");
const addModalSave = document.querySelector("#addsavebutton");
// Location Info -------------------------------------------- //
const inputLocation = document.querySelector("#modallocation");
const inputLink = document.querySelector("#modalimagelink");
// Edit Modal ------------------------------------------ //
const editButton = document.querySelector(".profile__edit-button");
const editModalBox = document.querySelector("#JSmodal");
const profileForm = document.querySelector(".modal__form");
// Profile Info ---------------------------------------------- //
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector("#modalName");
const inputDescription = document.querySelector("#modalDescription");
// Card Info ------------------------------------------- //
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardWindow = document.querySelector("#expanded-modal");

// Add Modal Functionality ---------------------------------------- //
function createCard(data) {
  const userCard = new Card(data, "#card-template", handleImageClick);
  return userCard.generateCard();
}

const imageAddPopup = new PopupWithForm("#AddPlaceModal", handleAddSubmit);
imageAddPopup.setEventListeners();

function handleAddSubmit() {
  EventTarget.preventDefault;
  const addInfo = imageAddPopup._getInputValues();
  cardListEl.prepend(createCard(addInfo));
  imageAddPopup.close();
  addFormValidator.toggleButtonState();
  /*
  evt.preventDefault();
  const name = inputLocation.value;
  const link = inputLink.value;
  cardListEl.prepend(createCard({ name, link }));
  closePopup(addModalBox);
  evt.target.reset();
  addFormValidator.toggleButtonState();
  */
}

addButton.addEventListener("click", () => {
  imageAddPopup.open();
});

function handleImageClick(cardData) {
  const modalImage = document.querySelector(".modal__image");
  const modalDescription = document.querySelector(".modal__image-alt");
  modalImage.src = cardData._link;
  modalImage.alt = cardData._name;
  modalDescription.textContent = cardData._name;
  cardWindow.open();
}

// Initial Cards ---------------------------------------------------------------- //

const cardRenderer = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      cardRenderer.addItems(createCard(card));
    },
  },
  cardListEl
);

cardRenderer.renderItems();

// Edit Modal Functionality --------------------------------- //
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  profileEditPopup.close();
}

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});

const profileEditPopup = new PopupWithForm("#JSmodal", handleProfileFormSubmit);

editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  inputName.value = currentUser.name;
  inputDescription.value = currentUser.job;

  profileEditPopup.open();
});

profileEditPopup.setEventListeners();

// Validation ------------------------------------------ //
const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
const editFormValidator = new FormValidator(config, editModalBox);
const addFormValidator = new FormValidator(config, addModalBox);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/*
// Open and Close popup //
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Extra Close Functionality -------------------------------------- //
function handleModalClose(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpen = document.querySelector(".modal_opened");
    if (modalOpen) {
      closePopup(modalOpen);
    }
  }

[editModalBox, addModalBox, cardWindow].forEach((modal) => {
modal.addEventListener("mousedown", handleModalClose);
});
}*/
