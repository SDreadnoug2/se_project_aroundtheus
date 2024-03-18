// Add Modal ---------------------------------------------------- //
export const addButton = document.querySelector(".profile__add-button");
export const addModalBox = document.querySelector("#AddPlaceModal");
export const addModalSave = document.querySelector("#addsavebutton");

// Location Info -------------------------------------------- //
export const inputLocation = document.querySelector("#modallocation");
export const inputLink = document.querySelector("#modalimagelink");

// Edit Modal ------------------------------------------ //
export const editButton = document.querySelector(".profile__edit-button");
export const editModalBox = document.querySelector("#JSmodal");
export const profileForm = document.querySelector(".modal__form");

// Profile Info ---------------------------------------------- //
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const inputName = document.querySelector("#modalName");
export const inputDescription = document.querySelector("#modalDescription");
export const profilePicture = document.querySelector(".profile__image");

// Card Info ------------------------------------------- //
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardWindow = document.querySelector("#expanded-modal");

export const initialCards = [];

export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

export const confirmDelete = document.querySelector("#ConfirmDelete");
export const profilePictureContainer = document.querySelector(
  ".profile__image-container"
);
export const ppUpdateBox = document.querySelector("#PPupdate");
export const modalButtons = document.querySelector(".modal__button");
