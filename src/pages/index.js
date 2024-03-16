import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
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
  cardListEl,
  initialCards,
  confirmDelete,
} from "../utils/constants.js";

// Instantiation ---------------------------------------------------------------- //

export const api = new Api();

const cardSection = new Section(
  {
    items: [],
    renderer: (card) => {
      cardSection.addItems(createCard(card));
    },
  },
  cardListEl
);

cardSection.renderItems();

const imagePopup = new PopupWithImage({ popupSelector: "#expanded-modal" });
const imageAddPopup = new PopupWithForm("#AddPlaceModal", handleAddSubmit);
const confirmDeletePopup = new Popup({ popupSelector: "#ConfirmModal" });
const profileEditPopup = new PopupWithForm("#JSmodal", handleProfileFormSubmit);

// Add Modal Functionality ---------------------------------------- //

api.loadUserCards().then((cardInfo) => {
  cardInfo.forEach((element) => {
    cardSection.addItems(createCard(element));
  });
});

imagePopup.setEventListeners();

function handleImageClick(data) {
  imagePopup.open(data);
}

function createCard(data) {
  const userCard = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteConfirm,
    handleLike
  );

  return userCard.generateCard();
}

addButton.addEventListener("click", () => {
  imageAddPopup.open();
});

imageAddPopup.setEventListeners();

function handleAddSubmit(info) {
  info.name = info.location;
  api.addNewCard(info);
  const cardObj = createCard(info);
  cardSection.addItems(cardObj);
  imageAddPopup.close();
  addFormValidator.toggleButtonState();
}

function handleDeleteConfirm(id, card) {
  confirmDeletePopup.open();
  confirmDeletePopup.setEventListeners();
  confirmDelete.addEventListener("click", (e) => {
    e.preventDefault();
    api.deleteCard(id);
    card.remove();
    confirmDeletePopup.close();
  });
}

function handleLike(id, isliked) {
  api.likeCard(id, isliked);
}

// Edit Modal Functionality --------------------------------- //
api.loadUserInfo().then((userInfoData) => {
  profileName.textContent = userInfoData.userName;
  profileDescription.textContent = userInfoData.userJob;
});

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});

function handleProfileFormSubmit(info) {
  console.log(info);
  userInfo.setUserInfo(info);
  profileEditPopup.close();
  api.updateProfile(info);
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
