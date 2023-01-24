class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkError);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(this._checkError);
  }

  editUserInfo(data) {
    const newUserInfo = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(`${this._baseUrl}/users/me`, newUserInfo).then(
      this._checkError
    );
  }

  addNewCard(data) {
    const newCard = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(`${this._baseUrl}/cards`, newCard).then(this._checkError);
  }

  deleteCard(cardId) {
    const newDeleteCard = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };
    return fetch(`${this._baseUrl}/cards/${cardId}`, newDeleteCard).then(
      this._checkError
    );
  }

  editAvatar(data) {
    const newAvatar = {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data, ['avatar']),
    };
    return fetch(`${this._baseUrl}/users/me/avatar`, newAvatar).then(
      this._checkError
    );
  }

  changeLikeCardStatus(cardId, setIsLiked) {
    const putLike = {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    const deleteLike = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    };

    return fetch(
      `${this._baseUrl}/cards/${cardId}/likes`,
      setIsLiked ? deleteLike : putLike
    ).then(this._checkError);
  }
}

const api = new Api({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.effycrush.nomoredomains.rocks'
});

export default api;
