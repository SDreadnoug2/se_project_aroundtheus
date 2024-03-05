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

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
