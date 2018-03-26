import { Injectable } from '@angular/core';

@Injectable()
export class ModalWindowServices {
  // protected visible = false;
  public visible = false;
  // protected message = 'Are you shure?';
  public message = 'Are you shure?';
  protected callback: (message: string) => void;

  constructor() {
    console.log('### ModalWindowServices constructor ###');
  }

  public show(message: string, callback: (message: string) => void) {
    console.log('### ModalWindowServices.show ###');
    this.message = message;
    this.visible = true;
    this.callback = callback;
  }

  public answer(message: string) {
    console.log(`### ModalWindowServices.answer:message: ${message} ###`);
    this.callback(message);
    this.visible = false;
  }
}
