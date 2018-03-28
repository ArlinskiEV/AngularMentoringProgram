import { Injectable } from '@angular/core';

@Injectable()
export class ModalWindowServices {
  public visible = false;
  public message = 'Are you shure?';
  public answerArr = ['Yes', 'No'];
  protected callback: (message: string) => void;
  // protected result: Promise<string>;
  constructor() {
    console.log('### ModalWindowServices constructor ###');
  }

  public show(
    message: string,
    callback: (message: string) => void, // how replace callback/promise?
    answerArr = ['Yes', 'No']
  )/*: Promise<string>*/ {
    console.log('### ModalWindowServices.show ###');
    // this.result = new Promise((res, rej) => { });
    this.message = message;
    this.answerArr = answerArr;
    this.callback = callback; // what i must do after answer
    this.visible = true;
    // return Promise...; // ??
  }

  public answer(message: string)/*: Promise<string>*/ {
    console.log(`### ModalWindowServices.answer:message: ${message} ###`);
    this.callback(message);
    this.visible = false;
    // return Promise.resolve(message);
  }
}
