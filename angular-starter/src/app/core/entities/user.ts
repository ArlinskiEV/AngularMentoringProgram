export interface Name {
  first: string;
  last: string;
}

export interface User {
  id: number;
  token: string;
  name: Name;
  login: string;
  password: string;
}

export interface SharedUserInfo {
  login: string;
  name: Name;
}

export interface Shared {
  sharedInfo(): SharedUserInfo;
}

export class MyUser implements Shared {
  public user: User;
  public sharedInfo(): SharedUserInfo {
    return {login: this.user.login, name: this.user.name};
  }
}

export interface UserFromServer {
  id: number;
  fakeToken: string;
  name: Name;
  login: string;
  password: string;
}
