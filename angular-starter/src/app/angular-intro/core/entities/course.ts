export interface Course {
  id: number;
  name: string;
  duration: number; // +new Date()
  createdDate: number; // + new Date()
  tags: string[];
  isAccept: boolean;
  text: string;
  topRated: boolean;
}
