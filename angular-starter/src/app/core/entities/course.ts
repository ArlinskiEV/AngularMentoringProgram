import { Author } from './author';
import { CourseFromServer } from './courseFromServer';

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

export class Course implements Course {
  public static updateCourseItemById(oldValue: Course, newValue: UpdateCourseItemById): Course {
    return new Course({
      ...oldValue,
      ...newValue
    });
  }

  public static fromServer(item: CourseFromServer): Course {
    return (new CourseFromServer(item)).transformToCourse();
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
