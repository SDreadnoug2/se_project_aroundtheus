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
  cardListEl,
  initialCards,
} from "../utils/constants.js";

// Instantiation ---------------------------------------------------------------- //

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      cardSection.addItems(createCard(card));
    },
  },
  cardListEl
);

cardSection.renderItems();

const imagePopup = new PopupWithImage({ popupSelector: "#expanded-modal" });
const imageAddPopup = new PopupWithForm("#AddPlaceModal", handleAddSubmit);
const userInfo = new UserInfo({
  userName: ".profile__name",
  userJob: ".profile__description",
});
const profileEditPopup = new PopupWithForm("#JSmodal", handleProfileFormSubmit);

// Add Modal Functionality ---------------------------------------- //

imagePopup.setEventListeners();

function handleImageClick(data) {
  imagePopup.open(data);
}

function createCard(data) {
  const userCard = new Card(data, "#card-template", handleImageClick);
  return userCard.generateCard();
}

addButton.addEventListener("click", () => {
  imageAddPopup.open();
});

imageAddPopup.setEventListeners();

function handleAddSubmit(info) {
  info.name = info.location;
  const cardArray = createCard({ name: info.name, link: info.link });
  const newCard = new Section(
    {
      items: [cardArray],
      renderer: (data) => {
        newCard.addItems(data);
      },
    },
    cardListEl
  );
  newCard.renderItems();
  imageAddPopup.close();
  addFormValidator.toggleButtonState();
}

// Edit Modal Functionality --------------------------------- //

function handleProfileFormSubmit(info) {
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
