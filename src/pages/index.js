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
  profilePicture,
  profilePictureContainer,
  ppUpdateBox,
  modalButtons,
} from "../utils/constants.js";

// Instantiation ---------------------------------------------------------------- //

export const api = new Api(renderLoading);

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
const confirmDeletePopup = new PopupWithForm(
  "#ConfirmModal",
  handleDeleteConfirm
);
const profileEditPopup = new PopupWithForm("#JSmodal", handleProfileFormSubmit);
const profilePictureUpdate = new PopupWithForm(
  "#PPupdate",
  handleProfilePictureUpdate
);

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
    handleDeleteOpen,
    handleLike
  );

  return userCard.generateCard();
}

addButton.addEventListener("click", () => {
  imageAddPopup.open();
});

imageAddPopup.setEventListeners();

profilePictureUpdate.setEventListeners();
profilePictureContainer.addEventListener("click", () => {
  profilePictureUpdate.open();
});

confirmDeletePopup.setEventListeners();
function handleDeleteOpen() {
  confirmDeletePopup.open();
}

function handleDeleteConfirm(id, element) {
  api.deleteCard(id).then(() => element.remove());
  confirmDeletePopup.close();
}

function handleLike(id, isliked) {
  api.likeCard(id, isliked);
  if (isliked === true) {
    return true;
  }
  if (isliked === false) {
    return false;
  }
}

// Edit Modal Functionality --------------------------------- //
api.loadUserInfo().then((userInfoData) => {
  profileName.textContent = userInfoData.userName;
  profileDescription.textContent = userInfoData.userJob;
  profilePicture.src = userInfoData.avatar;
});

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});

function renderLoading(isLoading) {
  if (isLoading) {
    modalButtons.classList.remove(".modal__button");
    modalButtons.classList.add(".modal__button_loading");
  } else {
    modalButtons.classList.add(".modal__button");
    modalButtons.classList.remove(".modal__button_loading");
  }
}

function handleProfileFormSubmit(info) {
  api.updateProfile(info).then(() => {
    userInfo.setUserInfo(info);
    profileEditPopup.close();
  });
}

function handleAddSubmit(info) {
  info.name = info.location;
  api.addNewCard(info).then((res) => {
    const cardObj = createCard(res);
    cardSection.addItems(cardObj);
  });
}

function handleProfilePictureUpdate(link) {
  api.updatePicture(link.profilepicture);
  profilePicture.src = link.profilepicture;
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
const profilePictureValidator = new FormValidator(config, ppUpdateBox);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
profilePictureValidator.enableValidation();
