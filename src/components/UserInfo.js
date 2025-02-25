export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }
  
  getUserInfo() {
    return {
      name: this._name.textContent,
      bio: this._description.textContent,
    };
  }
  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
