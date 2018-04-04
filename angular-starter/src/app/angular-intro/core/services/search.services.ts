import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SearchService {
  // private source = new BehaviorSubject(null);
  private source = new BehaviorSubject({
    field: 'name',
    compareWith: 'n',
  });

  public getSearchData() {
    return this.source.asObservable();
  }
  public setSearchData(data: any) {
    this.source.next(data);
  }
}
