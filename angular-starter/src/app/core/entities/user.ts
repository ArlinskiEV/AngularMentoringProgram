export interface User {
  id: number;
  token: string;
  name: {
    first: string;
    last: string;
  };
  login: string;
  password: string;
}

export interface SharedUserInfo {
  login: string;
  name: {
    first: string;
    last: string;
  };
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
  name: {
    first: string;
    last: string;
  };
  login: string;
  password: string;
}
