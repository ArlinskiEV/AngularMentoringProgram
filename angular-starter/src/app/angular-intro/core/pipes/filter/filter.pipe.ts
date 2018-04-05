import {
  Pipe,
  PipeTransform,
} from '@angular/core';

import { FilterRule } from '../../entities';

@Pipe({
  name: 'myFilter',
  pure: true,
})
export class FilterPipe<T> implements PipeTransform {
  public transform(
    value: T[],
    payload: FilterRule[]
  ): T[] {
    return [...value]
      .filter((item) => payload
        .every((rule) => {
          if (rule.exact) {
            return item[rule.field] === rule.compareWith;
          }

          let result = false;
          switch (typeof rule.compareWith) {
            case null: { break; }
            case 'string': {
              result = item[rule.field].indexOf(rule.compareWith) >= 0;
              break;
            }
          }
          // [start, end]
          if (rule.interval) {
            result = (rule.interval.start <= item[rule.field])
              && (item[rule.field] <= rule.interval.end);
          }
          return result;
        })
      )
    ;
  }
}
