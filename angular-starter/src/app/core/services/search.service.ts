import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FilterRule } from '../entities';

@Injectable()
export class SearchService {
  private source = new BehaviorSubject<FilterRule[]>([]);

  public getSearchData() {
    return this.source.asObservable();
  }
  public setSearchData(data) {
    this.source.next(data);
  }
}
