export interface Name {
  first: string;
  last: string;
}

export class Name implements Name {
  public first: string;
  public last: string;
  constructor(...rest) {
    this.first = rest[0] ? rest[0] : 'NoName';
    this.last = rest[1] ? rest[1] : 'NoName';
  }
}
