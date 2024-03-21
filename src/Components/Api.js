export default class Api {
  constructor(baseUrl, authorization) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: authorization,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}users/me`, { headers: this._headers })
      .then(this._checkResponse)
      .then((data) => {
        return {
          userName: data.name,
          userJob: data.about,
          avatar: data.avatar,
        };
      });
  }

  updateProfile(newInfo) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newInfo.userName,
        about: newInfo.userJob,
        avatar: newInfo.avatar,
      }),
    }).then(this._checkResponse);
  }

  loadUserCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addNewCard(info) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        link: info.link,
        id: info._id,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(id, status) {
    if (status === false) {
      return fetch(`${this._baseUrl}cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkResponse);
    }
    if (status === true) {
      return fetch(`${this._baseUrl}cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
  }

  updatePicture(link) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link.avatar,
      }),
    }).then(this._checkResponse);
  }
}
