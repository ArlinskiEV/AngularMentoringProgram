import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalWindowServices {
  public visible = false;
  public message = 'Are you shure?';
  public answerArr = ['Yes', 'No'];
  public result: Observable<string>;
  protected callback: (message: string) => void;
  constructor() {
    console.log('### ModalWindowServices constructor ###');
  }

  public show(
    message: string,
    answerArr = ['Yes', 'No']
  ): Observable<string> {
    console.log('### ModalWindowServices.show ###');
    this.message = message;
    this.answerArr = answerArr;
    this.visible = true;
    return Observable.create((observer) => {
      observer.onNext('1');
      observer.onCompleted();
    });
  }

  public answer(message: string)/*: Promise<string>*/ {
    console.log(`### ModalWindowServices.answer:message: ${message} ###`);
    this.callback(message);
    this.visible = false;
    // return Promise.resolve(message);
  }
}
