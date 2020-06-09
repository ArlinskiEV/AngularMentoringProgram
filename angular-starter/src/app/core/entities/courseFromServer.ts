import { Author } from './author';
import { Course } from './course';
import { Name } from '.';

export interface CourseFromServer {
  id: number;
  name: string;
  description: string;
  isTopRated: false;
  date: string; // Date
  authors: Author[];
  length: number;
}

export class CourseFromServer implements CourseFromServer {
  public id: number;
  public name: string;
  public description: string;
  public isTopRated: false;
  public date: string; // Date
  public authors: Author[];
  public length: number;
  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.isTopRated = obj.isTopRated;
    this.date = obj.date;
    this.authors = obj.authors.map((item) =>
      new Author(item.id, new Name(item.firstName, item.lastName)))
    ;
    this.length = obj.length;
  }

  public transformToCourse(): Course {
    return new Course({
      id: this.id,
      name: this.name,
      duration: + new Date(this.length * 60000),
      date: + new Date(this.date),
      tags: [],
      isAccept: false,
      text: this.description,
      topRated: this.isTopRated,
    });
  }

}
