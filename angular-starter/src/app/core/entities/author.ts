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
  constructor(
    public id: number,
    public name: Name,
  ) {}
}
