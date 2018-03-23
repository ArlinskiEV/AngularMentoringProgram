export class MyDate {
  public day: number;
  public month: string;
  public year: number;

  constructor(d: number, m: string, y: number) {
    this.day = d;
    this.month = m;
    this.year = y;
  }

  public toString() {
    console.log('tostring');
    return `d:${this.day} m:${this.month} y:${this.year}`;
  }
}
