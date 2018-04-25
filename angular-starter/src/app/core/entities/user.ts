import { Name } from '../entities';

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

export interface UserLoginModel {
  login: string;
  password: string;
}

export interface UserFromServer {
  id: number;
  fakeToken: string;
  name: Name;
  login: string;
  password: string;
}

// -----------------------------------------------
// how do it right?
export class User implements User {
  public id: number;
  public token: string | null;
  public name: Name;
  public login: string;
  public password: string;
  constructor(obj?: any) {
    this.id = obj && obj.id ? obj.id : 0;
    this.token = obj && obj.token ? obj.token : null;
    this.name = obj && obj.name
      ? new Name(obj.name.first, obj.name.last)
      : new Name();
    this.login = obj && obj.login ? obj.login : 'NoLogin';
    this.password = obj && obj.password ? obj.password : '';
  }
  public sharedInfo(): SharedUserInfo {
    return {login: this.login, name: this.name};
  }
}
