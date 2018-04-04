import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'myOrderBy',
  pure: true,
})
export class OrderByPipe<T> implements PipeTransform {
  public transform(temp: T[]): T[] {
    // return temp.sort((a: any, b: any) => a - b);
    return temp.reverse();
  }
}
