class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  };

  //проверка ответа сервера
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  //загрузка данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  };

  //обновление аватара
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => this._checkServerResponse(res));
  };

  //редактирование профиля
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => this._checkServerResponse(res));
  };

  //загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  };

  //добавить новую карточку
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => this._checkServerResponse(res));
  };

  //удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  };

  //поставить/снять лайк
  toggleLikeCard(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers
    })
      .then(res => this._checkServerResponse(res));
  };

};

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: '2e8fc64d-f56b-4a8b-9573-f07d48d61f79',
    'Content-Type': 'application/json'
  }
});

export default api;
