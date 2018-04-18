export interface Course {
  id: number;
  name: string;
  duration: number; // +new Date()
  date: number; // + new Date()
  tags: string[];
  isAccept: boolean;
  text: string;
  topRated: boolean;
}

export class Course implements Course {
  public id: number;
  public name: string;
  public duration: number;
  public date: number;
  public tags: string[];
  public isAccept: boolean;
  public text: string;
  public topRated: boolean;
  constructor(obj?: any) {
    this.id = obj && obj.id ? obj.id : 0;
    this.name = obj && obj.name ? obj.name : 'NoName';
    this.duration = obj && obj.duration ? obj.duration : + new Date();
    this.date = obj && obj.date ? obj.date : + new Date();
    this.tags = obj && obj.tags ? obj.tags : ['error'];
    this.isAccept = obj && obj.isAccept ? obj.isAccept : false;
    this.text = obj && obj.text ? obj.text : 'error: it is an empty text';
    this.topRated = obj && obj.topRated ? obj.topRated : false;
  }
}

export interface UpdateCourseItem {
  id: number;
  name?: string;
  duration?: number; // +new Date()
  date?: number; // + new Date()
  tags?: string[];
  isAccept?: boolean;
  text?: string;
  topRated?: boolean;
}

interface Author {
  id: number;
  firstName: string;
  lastName: string;
}

export interface CourseFromServer {
  id: number;
  name: string;
  description: string;
  isTopRated: false;
  date: string; // Date
  authors: Author[];
  length: number;
}
