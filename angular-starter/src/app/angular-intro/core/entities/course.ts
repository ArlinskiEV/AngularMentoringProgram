import { MyTime } from './time';
export class Course {
  public id: number;
  public name: string;
  public duration: MyTime;
  public date: Date;
  public tags: string[];
  public isAccept: boolean;
  public text: string;
}
