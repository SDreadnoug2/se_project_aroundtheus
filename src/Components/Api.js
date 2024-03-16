export default class Api {
  constructor(id) {
    this._id = id;
    this._baseUrl = "https://around-api.en.tripleten-services.com/v1/";
    this._authorization = "4135af44-f1c9-452d-8222-e09e3e6f1c85";
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: { authorization: `${this._authorization}` },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        return { userName: data.name, userJob: data.about };
      })
      .catch((error) => {
        console.error("Error loading user info:", error);
      });
  }

  updateProfile(newInfo) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newInfo.title,
        about: newInfo.description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => console.error("Error updating user info:", error));
  }

  loadUserCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: { authorization: `${this._authorization}` },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  addNewCard(info) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: {
        authorization: `${this._authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        link: info.link,
        id: info._id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => console.error(error));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._authorization}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return console.log("This post has been deleted");
        }
      })
      .catch((error) => console.error(error));
  }

  likeCard(id, status) {
    return fetch(`${this._baseUrl}cards/${id}/likes`
  }
}
