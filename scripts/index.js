const initialCards = [
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
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// ----------------------------------------------------------------------------- //

// Open and Close popup //
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", modalEscape);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", modalEscape);
}
// Close buttons //
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closePopup(modal));
});

// Extra Close Functionality -------------------------------------- //
function closeModalOnRemoteClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("modal__close")
  ) {
    const modal = evt.target.closest(".modal");
    closePopup(modal);
  }
}

function modalEscape(evt) {
  if (evt.key === "Escape") {
    const modalOpen = document.querySelector(".modal_opened");
    if (modalOpen) {
      closePopup(modalOpen);
    }
  }
}

editModalBox.addEventListener("click", closeModalOnRemoteClick);
addModalBox.addEventListener("click", closeModalOnRemoteClick);

// Add Modal Functionality ---------------------------------------- //

function handleAddSubmit(evt) {
  evt.preventDefault();

  const name = inputLocation.value;
  const link = inputLink.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  closePopup(addModalBox);
  evt.target.reset();
}

addButton.addEventListener("click", () => {
  openPopup(addModalBox);
});

addModalBox.addEventListener("submit", handleAddSubmit);

// Edit Modal Functionality --------------------------------- //

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editModalBox);
}

editButton.addEventListener("click", () => {
  openPopup(editModalBox);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Card Functionality ---------------------------------------------------- //
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const trash = cardElement.querySelector("#trash");
  const cardModal = document.querySelector("#expanded-modal");
  const modalImage = document.querySelector(".modal__image");
  const modalDescription = document.querySelector(".modal__image-alt");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  // Like Button //
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-button_active");
  });
  // Trash Can //
  trash.addEventListener("click", () => {
    cardElement.remove();
  });
  // enlarge //

  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    modalDescription.textContent = cardData.name;
    openPopup(cardModal);
  });

  cardModal.addEventListener("click", closeModalOnRemoteClick);

  return cardElement;
}

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
