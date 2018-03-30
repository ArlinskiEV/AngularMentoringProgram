import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalWindowServices {

  public data = {
    message: 'Are you shure?',
    answerArr: ['Yes', 'No'],
    visible: false,
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
    this.data.visible = true;

    return this.source;
    // return new Observable((observer) => {
    //   const listener = this.source.subscribe(
    //     (x) => observer.next(x), // resend all from source in new Observable
    //     (error) => { console.warn(`### ModalWindowServices.show.error: ${error} ###`); },
    //     () => {
    //       this.data.visible = false;
    //       observer.complete();
    //     },
    //   );
    // });
  }

  public listenMe(source: Observable<string>) {
    this.source = source;
  }
}
