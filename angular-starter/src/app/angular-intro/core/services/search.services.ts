import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FilterRule } from '../entities';

@Injectable()
export class SearchService {
  private source: BehaviorSubject<FilterRule[]> = new BehaviorSubject([{
    field: 'date',
    compareWith: null,
    interval: {
      start: + Date.now() - 14 * 24 * 60 * 60 * 1000,
      end: + Date.now()
    },
  }]);

  public getSearchData() {
    return this.source.asObservable();
  }
  public setSearchData(data) {
    this.source.next(data);
  }
}

console.error('click "find" with empty field');
