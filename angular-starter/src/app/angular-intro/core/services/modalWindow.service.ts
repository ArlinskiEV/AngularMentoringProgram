import { Injectable } from '@angular/core';

@Injectable()
export class ModalWindowServices {
  public visible = false;
  public message = 'Are you shure?';
  public answerArr = ['Yes', 'No'];
  protected callback: (message: string) => void;

  constructor() {
    console.log('### ModalWindowServices constructor ###');
  }

  public show(message: string, callback: (message: string) => void, answerArr = ['Yes', 'No']) {
    console.log('### ModalWindowServices.show ###');
    this.message = message;
    this.callback = callback;
    this.visible = true;
  }

  public answer(message: string) {
    console.log(`### ModalWindowServices.answer:message: ${message} ###`);
    this.callback(message);
    this.visible = false;
  }
}
