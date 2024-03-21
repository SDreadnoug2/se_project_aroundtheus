import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
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

export const api = new Api(
  "https://around-api.en.tripleten-services.com/v1/",
  "4135af44-f1c9-452d-8222-e09e3e6f1c85"
);

const cardSection = new Section(
  {
    items: [],
    renderer: (card) => {
      cardSection.addItems(createCard(card));
    },
  },
  cardListEl
);

const imagePopup = new PopupWithImage({ popupSelector: "#expanded-modal" });
const imageAddPopup = new PopupWithForm("#AddPlaceModal", handleAddSubmit);
const deletePopup = new PopupWithConfirmation("#ConfirmModal");
const profileEditPopup = new PopupWithForm("#JSmodal", handleProfileFormSubmit);
const profilePictureUpdate = new PopupWithForm(
  "#PPupdate",
  handleProfilePictureUpdate
);
const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
  userAvatar: ".profile__image",
});

// Add Modal Functionality ---------------------------------------- //
function loadAllcards() {
  return new Promise(() => {
    api
      .loadUserCards()
      .then((cardInfo) => {
        cardSection.setItems(cardInfo);
        cardSection.renderItems();
      })
      .catch((error) => console.error(error));
  });
}

loadAllcards();
imagePopup.setEventListeners();

function handleImageClick(data) {
  imagePopup.open(data);
}

function deleteSubmit(id, element) {
  deletePopup.open();
  deletePopup.handleConfirm(() => {
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
  return new Promise((resolve) => {
    api
      .likeCard(id, isliked)
      .then(() => resolve())
      .catch((error) => {
        console.error(error);
      });
  });
}

// Edit Modal Functionality --------------------------------- //
api
  .loadUserInfo()
  .then((userInfoData) => {
    console.log(userInfoData);
    userInfo.setUserInfo(userInfoData);
    userInfo.setUserPicture(userInfoData);
  })
  .catch((error) => console.error(error));

function handleProfileFormSubmit(info) {
  return new Promise(() => {
    console.log(info);
    profileEditPopup.renderLoading(true);
    api
      .updateProfile(info)
      .then(() => {
        userInfo.setUserInfo(info);
      })
      .then(() => {
        editFormValidator.toggleButtonState();
        profileEditPopup.close();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        profileEditPopup.renderLoading(false);
      });
  });
}

function handleAddSubmit(info) {
  imageAddPopup.renderLoading(true);
  info.name = info.location;
  return new Promise(() => {
    api
      .addNewCard(info)
      .then((res) => {
        const cardObj = createCard(res);
        cardSection.addItems(cardObj);
      })
      .then(() => {
        addFormValidator.toggleButtonState();
        imageAddPopup.close();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        imageAddPopup.renderLoading(false);
      });
  });
}

function handleProfilePictureUpdate(link) {
  return new Promise(() => {
    profilePictureUpdate.renderLoading(true);
    api
      .updatePicture(link)
      .then((res) => {
        userInfo.setUserPicture(res);
      })
      .then(() => profilePictureValidator.toggleButtonState())
      .catch((error) => console.error(error))
      .finally(() => {
        profilePictureUpdate.close();
        profilePictureUpdate.renderLoading(false);
      });
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
