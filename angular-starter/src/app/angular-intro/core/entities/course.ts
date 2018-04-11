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
