export default class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._bio = document.querySelector(description);
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
