import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ModalRule, Answer } from '../entities';

@Injectable()
export class ModalWindowService {

  private source: Subject<ModalRule>;
  private answerSream: Subject<Answer>;

  constructor() {
    console.log('### ModalWindowServices constructor ###');
    this.source = new Subject();
    this.answerSream = new Subject();
  }

  public get data() {
    return this.source.asObservable();
  }

  public show(query: ModalRule): Observable<Answer> {
    this.source.next(query);
    return this.answerSream.asObservable();
  }

  public answer(response: Answer) {
    this.answerSream.next(response);
  }
}
