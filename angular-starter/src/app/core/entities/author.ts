import { Name } from './name';

export interface Author {
  id: number;
  name: Name;
}

export class Author implements Author {
  constructor(
    public id: number,
    public name: Name,
  ) {}
}
