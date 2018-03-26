import {
  Component,
} from '@angular/core';

import { ModalWindowServices } from '../core/services/modalWindow.service';

@Component({
  selector: 'modalWindow',
  templateUrl: './modalWindow.component.html',
  styleUrls: ['./modalWindow.component.css']
})
export class ModalWindowComponent {

  constructor(private modalWindowServices: ModalWindowServices) {
    console.log('ModalWindowComponent constructor');
  }

  protected handler(result: string) {
    console.log(`modal ${result}`);
    this.modalWindowServices.answer(result);
  }
  get visible() {
    return this.modalWindowServices.visible;
  }
  get message() {
    return this.modalWindowServices.message;
  }
  get answersArr() {
    return this.modalWindowServices.answerArr
      .map((item) => {
        return {click: (text) => this.handler(text), text: item};
      });
  }
}
