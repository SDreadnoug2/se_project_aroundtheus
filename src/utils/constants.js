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

// Card Info ------------------------------------------- //
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardWindow = document.querySelector("#expanded-modal");

export const initialCards = [
  {
    name: "Denali",
    link: "https://images.unsplash.com/photo-1586373125105-a5ed72202fc6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Arches",
    link: "https://images.unsplash.com/photo-1606859309981-270838d57ed8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Banff",
    link: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Zion",
    link: "https://images.unsplash.com/photo-1606681129845-a6ab3e1017e3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Monument Valley",
    link: "https://images.unsplash.com/photo-1516926133025-705ee504386d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Grand Tetons",
    link: "https://images.unsplash.com/photo-1545394734-b4140a8cfa9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};
