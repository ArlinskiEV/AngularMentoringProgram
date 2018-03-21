import { Time } from './time';

export class Course {
  public id: number;
  public name: string;
  public duration: Time;
  public tags: string[];
  public isAccept: boolean;
}
