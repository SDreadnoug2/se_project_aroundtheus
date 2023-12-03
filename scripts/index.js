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

let editButton = document.querySelector(".profile__edit-button");
let modalBox = document.querySelector("#JSmodal");
let closeButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector("#modalName");
const inputDescription = document.querySelector("#modalDescription");
const modalSubmit = document.querySelector(".modal__button");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function toggleModal() {
  modalBox.classList.toggle("modal__opened");
}
editButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  toggleModal();
}

modalSubmit.addEventListener("click", handleFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
/*
Declare a getCardElement() function with one parameter named data. You’ll be passing objects of the array to it. The function should:
clone the template element with all its content and store it in a cardElement variable
access the card title and image and store them in variables
set the path to the image to the link field of the object
set the image alt text to the name field of the object
set the card title to the name field of the object, too
return the ready HTML element with the filled-in data
Iterate over the cards array using a loop, and in each iteration:
Run your getCardElement() function on the card object to create the HTML element.
Use the appropriate built-in DOM method to add this HTML element to the page.

function getCardElement(data) {
  const cardElement = document.querySelector("#card-template").content;
  const cardName = initialCards.name;
  const cardImage = initialCards.link;
}

initialCards.forEach((cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__title");

  cardTitleEl.textContent = cardData.name;
  cardImageEl = cardData.link;

  cardListEl.append(cardElement);
});
*/
