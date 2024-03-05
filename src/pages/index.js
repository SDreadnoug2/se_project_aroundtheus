import { cardListEl, initialCards } from "../utils/constants.js";
import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import UserInfo from "../Components/UserInfo.js";
import "../pages/index.css";
import {
  config,
  addButton,
  addModalBox,
  addModalSave,
  inputLocation,
  inputLink,
  editButton,
  editModalBox,
  profileForm,
  profileName,
  profileDescription,
  inputName,
  inputDescription,
  cardTemplate,
  cardWindow,
} from "../Components/Constants.js";
import ppSrc from "../images/pp.png";
import logoSrc from "../images/logo.svg";

const profilePicture = document.getElementById("profilepicture");
profilePicture.src = profilePicture;
const logoImage = document.getElementById("logo");
logoImage.src = logoImage;

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
  addInfo.name = addInfo.location;
  console.log(addInfo);
  cardListEl.prepend(createCard(addInfo));
  imageAddPopup.close();
  addFormValidator.toggleButtonState();
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
  console.log(data);
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

const editFormValidator = new FormValidator(config, editModalBox);
const addFormValidator = new FormValidator(config, addModalBox);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
