import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ModalRule } from '../entities';

@Injectable()
export class ModalWindowService {

  private source: Subject<ModalRule>;
  private answerSream: Subject<string>;

  constructor() {
    console.log('### ModalWindowServices constructor ###');
    this.source = new Subject();
    this.answerSream = new Subject();
  }

  public get data() {
    return this.source.asObservable();
  }

  public show( query: ModalRule): Observable<string> {
    this.source.next(query);
    return this.answerSream.asObservable();
  }

  public answer(response: string) {
    this.answerSream.next(response);
  }
}
