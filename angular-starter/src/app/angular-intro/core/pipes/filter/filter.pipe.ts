import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'myFilter',
  pure: true,
})
export class FilterPipe<T> implements PipeTransform {
  public transform(
    value: T[],
    payload: {field: string, compareWith: string, exact?: boolean}
  ): T[] {
    return [...value]
      .filter((item) => payload.exact
        ? item[payload.field] === payload.compareWith
        : item[payload.field].indexOf(payload.compareWith) >= 0);
  }
}
