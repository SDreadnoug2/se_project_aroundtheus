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

// Instantiation ---------------------------------------------------------------- //

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

const imagePopup = new PopupWithImage({ popupSelector: "#expanded-modal" });
const imageAddPopup = new PopupWithForm("#AddPlaceModal", handleAddSubmit);
const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});
const profileEditPopup = new PopupWithForm("#JSmodal", handleProfileFormSubmit);

// Add Modal Functionality ---------------------------------------- //

imagePopup.setEventListeners();

function handleImageClick({ name, link }) {
  imagePopup.open({ name, link });
}

function createCard(data) {
  const userCard = new Card(data, "#card-template", handleImageClick);
  return userCard.generateCard();
}

addButton.addEventListener("click", () => {
  console.log("clikced");
  imageAddPopup.open();
});

imageAddPopup.setEventListeners();

function handleAddSubmit() {
  EventTarget.preventDefault;
  const addInfo = imageAddPopup._getInputValues();
  addInfo.name = addInfo.location;
  cardListEl.prepend(createCard(addInfo));
  imageAddPopup.close();
  addFormValidator.toggleButtonState();
}

// Edit Modal Functionality --------------------------------- //

function handleProfileFormSubmit() {
  const info = profileEditPopup._getInputValues();
  console.log(info);
  userInfo.setUserInfo(info);
  profileEditPopup.close();
}

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
