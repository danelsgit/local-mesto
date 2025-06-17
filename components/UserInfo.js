
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);

    this._userName = this._nameElement.textContent;
    this._userAbout = this._aboutElement.textContent;
  }

  getUserInfo() {
    return {
      name: this._userName,
      about: this._userAbout
    };
  }

  setUserInfo(data) {
    if (data.name) {
      this._userName = data.name;
      this._nameElement.textContent = data.name;
    }
    if (data.about) {
      this._userAbout = data.about;
      this._aboutElement.textContent = data.about;
    }
  }

  setUserAvatar(link) {
    if (link) this._avatar.src = link;
  }
}
