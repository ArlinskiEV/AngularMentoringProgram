import { MyTime } from './time';
import { MyDate } from './date';
export class Course {
  public id: number;
  public name: string;
  public duration: MyTime;
  public date: MyDate;
  public tags: string[];
  public isAccept: boolean;
  public text: string;
}
