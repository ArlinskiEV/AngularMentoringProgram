import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalWindowServices {

  public data = {
    message: 'Are you shure?',
    answerArr: ['Yes', 'No'],
  };
  private source: Observable<string>;

  constructor() {
    console.log('### ModalWindowServices constructor ###');
  }

  public show(
    message: string,
    answerArr = ['Yes', 'No']
  ): Observable<string> {
    console.log('### ModalWindowServices.show ###');

    this.data.message = message;
    this.data.answerArr = answerArr;

    return this.source;
  }

  public listenMe(source: Observable<string>) {
    this.source = source;
  }
}
