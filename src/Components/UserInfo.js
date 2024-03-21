export default class UserInfo {
  constructor({ userName, userJob, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  }

  setUserProfile(data) {
    this._userName.textContent = data.userName;
    this._userJob.textContent = data.userJob;
    this._userAvatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._userName.textContent = data.userName;
    this._userJob.textContent = data.userJob;
  }
}
