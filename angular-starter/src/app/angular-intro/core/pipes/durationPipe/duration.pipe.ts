import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'myDurations',
  pure: true,
})
export class DurationPipe implements PipeTransform {
  public transform(value: number): string {
    // hh h mm min. (ex: 1h 15min)
    let result = '';
    const temp = new Date(value);
    if (temp.getHours()) {
      result += temp.getHours() + 'h ';
    }
    result += temp.getMinutes() + 'min';
    return result;
  }
}
