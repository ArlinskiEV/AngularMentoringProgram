export interface User {
  id: number;
  userName: string;
  token: string;
}

export interface SharedUserInfo {
  login: string;
}

export interface Shared {
  sharedInfo(): SharedUserInfo;
}

export class MyUser implements Shared {
  public user: User;
  public sharedInfo(): SharedUserInfo {
    return {login: this.user.userName};
  }
}
