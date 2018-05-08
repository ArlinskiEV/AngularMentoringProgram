import {
  Pipe,
  PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'myOrderBy',
  pure: true,
})
export class OrderByPipe<T> implements PipeTransform {
  public transform(value: T[], field?: string, order?: string): T[] {
    if (order && order !== 'desc') {
      throw new Error('wrong order');
    }
    const isDesc: boolean = order === 'desc';
    return [...value]
      .sort((a: any, b: any) => field
        ? isDesc ? b[field] - a[field] : a[field] - b[field]
        : isDesc ? b - a : a - b
      );
  }
}
