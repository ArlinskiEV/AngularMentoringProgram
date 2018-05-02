import { Name } from './name';

export interface Author {
  id: number;
  name: Name;
}

export interface AuthorFromServer {
  id: number;
  firstName: string;
  lastName: string;
}

export class Author implements Author {
  public static fromServer(item: AuthorFromServer): Author {
    return new Author(item.id, new Name(item.firstName, item.lastName));
  }
  constructor(
    public id: number,
    public name: Name,
  ) {}
}
