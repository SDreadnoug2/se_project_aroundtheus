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
const addCloseButton = document.querySelector("#addmodalclose");
const addModalSave = document.querySelector("#addsavebutton");

// Location Info -------------------------------------------- //
const inputLocation = document.querySelector("#modallocation");
const inputLink = document.querySelector("#modalimagelink");

// Edit Modal ------------------------------------------ //
const editButton = document.querySelector(".profile__edit-button");
const modalBox = document.querySelector("#JSmodal");
const editCloseButton = document.querySelector(".modal__close");
const modalSubmit = document.querySelector(".modal__form");

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

// Add Modal Functionality ---------------------------------------- //
function toggleAddModal() {
  addModalBox.classList.toggle("modal_opened");
}

function handleAddSubmit(evt) {
  evt.preventDefault();
  const name = inputLocation.value;
  const link = inputLink.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  toggleAddModal();
}

addButton.addEventListener("click", () => {
  toggleAddModal();
});

addCloseButton.addEventListener("click", toggleAddModal);

addModalBox.addEventListener("submit", handleAddSubmit);

// Edit Modal Functionality --------------------------------- //
function toggleModal() {
  modalBox.classList.toggle("modal_opened");
}

function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  toggleModal();
}

editButton.addEventListener("click", () => {
  toggleModal();
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

editCloseButton.addEventListener("click", toggleModal);

modalSubmit.addEventListener("submit", handleFormSubmit);

// Card Functionality ---------------------------------------------------- //
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  const likeButtons = cardElement.querySelector(".cards__like-button");
  const trash = cardElement.querySelector("#trash");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  // Like Button //
  likeButtons.addEventListener("click", () => {
    likeButtons.classList.toggle("cards__like-button_active");
  });
  // Trash Can //
  trash.addEventListener("click", () => {
    cardElement.remove();
  });
  // enlarge //
  const cardModal = document.querySelector(".cards__modal");
  const cardModalButton = document.querySelector("#expand-close");
  const modalImage = document.querySelector(".cards__modal-image");
  const modalDescription = document.querySelector(".cards__modal-alt");

  cardModalButton.addEventListener("click", () => {
    cardModal.classList.remove("cards__modal_opened");
  });
  cardImage.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalDescription.textContent = cardData.name;
    cardModal.classList.toggle("cards__modal_opened");
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
