import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalWindowServices {
  // public visible = false;
  // public message = 'Are you shure?';
  // public answerArr = ['Yes', 'No'];
  public data = {
    visible: false,
    // click: (answer: string) => Promise.resolve(answer),
    message: 'Are you shure?',
    answerArr: ['Yes', 'No'],
  };

  // public result: Promise<string>;

  // protected callback: (message: string) => void;
  protected source: Observable<string>;
  private sound: Observable<string>;

  constructor() {
    console.log('### ModalWindowServices constructor ###');
    // create observer
    this.source = new Observable((observer) => {
      console.warn('observ in modal-serv');
      console.log('### ModalWindowServices.observable ###');
      const listener = this.sound.subscribe(
        (message) => observer.next(message),
        (error) => console.error(`error modalWindow.service:${error}`),
        () => {
          console.log('### ModalWindowServices.observable:  sound is done###');
          observer.complete();
        }
      );
      console.warn('observ end in modal-serv');
    });

  }
  public click(answer: string) {
    return Promise.resolve(answer);
  }

  public show(
    message: string,
    // callback: (message: string) => void, // how replace callback/promise?
    answerArr = ['Yes', 'No']
  ): Observable<string> {
    console.log('### ModalWindowServices.show ###');
    // this.message = message;
    // this.answerArr = answerArr;
    // // this.callback = callback;
    // this.visible = true;

    // this.data = {
    //   // ...this.data,
    //   visible: true,
    //   message,
    //   answerArr,
    //     // .map((item) => {
    //     //   return {
    //     //     click: () => {
    //     //       // this.handler(item);
    //     //       console.log('WTF??');
    //     //   }, text: item};
    //     // })
    // };
    this.data.visible = true; console.warn('show');
    this.data.message = message;
    this.data.answerArr = answerArr;

    return new Observable((observer) => {
      console.warn('observ in modal-serv-return');
      const listener = this.source.subscribe(
        (x) => { // resend all from source in new Observable
          console.log(`resent:${x}`);
          observer.next(x);
        },
        (error) => { console.log(`### ModalWindowServices.show.error: ${error} ###`); },
        () => {
          console.log('### ModalWindowServices.done? ###');
          this.data.visible = false;
          console.warn('hide');
        }
      );
      // observer.next('---');
      console.warn('observ end in modal-serv-ret');
    });

    // return new Promise((res) => {
    //   this.data.visible = false;
    //   res(this.result);
    // });
  }

  // public answer(message: string)/*: Promise<string>*/ {
  //   console.log(`### ModalWindowServices.answer:message: ${message} ###`);
  //   // this.callback(message);

  //   // -----------------
  //   // this.result = Promise.resolve(message);
  //   // this.visible = false;
  //   // return Promise.resolve(message);
  // }

  public listenMe(source: Observable<string>) {
    this.sound = source;
  }
}
