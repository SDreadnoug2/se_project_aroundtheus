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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
const deletePopup = new PopupWithConfirmation("#ConfirmModal");
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

function deleteSubmit(id, element) {
  deletePopup.open();
  deletePopup.confirmRemoval(() => {
    api
      .deleteCard(id)
      .then(() => {
        deletePopup.close();
        element.remove();
      })
      .catch((error) => console.error(error));
  });
}

deletePopup.setEventListeners();
function createCard(data) {
  const userCard = new Card(
    data,
    "#card-template",
    handleImageClick,
    deleteSubmit,
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
api
  .loadUserInfo()
  .then((userInfoData) => {
    profileName.textContent = userInfoData.userName;
    profileDescription.textContent = userInfoData.userJob;
    profilePicture.src = userInfoData.avatar;
  })
  .catch((error) => console.error(error));

const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});

function handleProfileFormSubmit(info) {
  profileEditPopup.renderLoading(true);
  api
    .updateProfile(info)
    .then(() => {
      userInfo.setUserInfo(info);
      profileEditPopup.close();
    })
    .then(() => profileEditPopup.renderLoading(false))
    .catch((error) => console.error(error))
    .finally(() => {
      editFormValidator.toggleButtonState();
    });
}

function handleAddSubmit(info) {
  imageAddPopup.renderLoading(true);
  info.name = info.location;
  api
    .addNewCard(info)
    .then((res) => {
      const cardObj = createCard(res);
      cardSection.addItems(cardObj);
    })
    .then(() => imageAddPopup.renderLoading(false))
    .catch((error) => console.error(error))
    .finally(() => {
      addFormValidator.toggleButtonState();
    });
}

function handleProfilePictureUpdate(link) {
  profilePictureUpdate.renderLoading(true);
  api
    .updatePicture(link.profilepicture)
    .then(() => {
      profilePicture.src = link.profilepicture;
    })
    .then(() => profilePictureUpdate.renderLoading(false))
    .catch((error) => console.error(error))
    .finally(() => {
      profilePictureValidator.toggleButtonState();
    });
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
