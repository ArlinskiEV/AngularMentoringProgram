import { Author } from './author';

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
    this.authors = obj.authors.map((item) => Author.fromServer(item));
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
      authors: [...this.authors]
    });
  }

}

export interface Course {
  id: number;
  name: string;
  duration: number; // +new Date()
  date: number; // + new Date()
  authors: Author[];
  tags: string[];
  isAccept: boolean;
  text: string;
  topRated: boolean;
}

export interface UpdateCourseItemById {
  id: number;
  name?: string;
  duration?: number; // +new Date()
  date?: number; // + new Date()
  authors?: Author[];
  tags?: string[];
  isAccept?: boolean;
  text?: string;
  topRated?: boolean;
}

/* tslint:disable:max-classes-per-file */
export class Course implements Course {
  public static updateCourseItemById(oldValue: Course, newValue: UpdateCourseItemById): Course {
    return new Course({
      ...oldValue,
      ...newValue
    });
  }

  public static fromServer(item: CourseFromServer): Course {
    return new CourseFromServer(item).transformToCourse();
  }

  public id: number;
  public name: string;
  public duration: number;
  public date: number;
  public authors: Author[];
  public tags: string[];
  public isAccept: boolean;
  public text: string;
  public topRated: boolean;

  constructor(obj?: any) {
    this.id = obj && obj.id ? obj.id : 0;
    this.name = obj && obj.name ? obj.name : '';
    this.duration = obj && obj.duration ? obj.duration : 0;
    this.date = obj && obj.date ? obj.date : 0;
    this.tags = obj && obj.tags ? obj.tags : [];
    this.isAccept = obj && obj.isAccept ? obj.isAccept : false;
    this.text = obj && obj.text ? obj.text : '';
    this.topRated = obj && obj.topRated ? obj.topRated : false;
    this.authors = obj && obj.authors ? obj.authors : [];
  }

}
/* tslint:enable */
