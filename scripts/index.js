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

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const modalBox = document.querySelector("#JSmodal");
const addModalBox = document.querySelector("#AddPlaceModal");
const editCloseButton = document.querySelector(".modal__close");
const addCloseButton = document.querySelector("#addmodalclose");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector("#modalName");
const inputDescription = document.querySelector("#modalDescription");
const inputLocation = document.querySelector("#modallocation");
const inputLink = document.querySelector("#modalimagelink");
const modalSubmit = document.querySelector(".modal__form");
const addModalSave = document.querySelector("#addsavebutton");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function toggleModal() {
  modalBox.classList.toggle("modal_opened");
}

function toggleAddModal() {
  addModalBox.classList.toggle("modal_opened");
}

addButton.addEventListener("click", () => {
  toggleAddModal();
});

editButton.addEventListener("click", () => {
  toggleModal();
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

editCloseButton.addEventListener("click", toggleModal);

addCloseButton.addEventListener("click", toggleAddModal);

//runs when  profile submit is clicked//
function handleFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  toggleModal();
}

modalSubmit.addEventListener("submit", handleFormSubmit);

// runs when add save is clicked //
function handleAddSubmit(evt) {
  evt.preventDefault();
  const name = inputLocation.value;
  const link = inputLink.value;
  const cardElement = getCardElement({ name, link });
  cardListEl.prepend(cardElement);
  toggleAddModal();
}

addModalBox.addEventListener("submit", handleAddSubmit);

// converts array into cards //
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  return cardElement;
}

// places cards on the website //
initialCards.forEach((cardData) => {
  cardListEl.prepend(getCardElement(cardData));
});
