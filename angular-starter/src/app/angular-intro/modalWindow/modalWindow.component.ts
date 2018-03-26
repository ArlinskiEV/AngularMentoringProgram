import {
  Component,
  // Input,
  // Output,
  // EventEmitter,
} from '@angular/core';

import { ModalWindowServices } from '../core/services/modalWindow.service';

@Component({
  selector: 'modalWindow',
  templateUrl: './modalWindow.component.html',
  styleUrls: ['./modalWindow.component.css']
})
export class ModalWindowComponent {
  // @Input() protected visible = false;
  // @Input() protected message = 'You are shure?';
  // @Output('confirm') protected confirm = new EventEmitter();

  constructor(private modalWindowServices: ModalWindowServices) {
    console.log('ModalWindowComponent constructor');
  }

  // ------------------------------
  // protected accept() {
  //   console.log('modal accept');
  //   this.confirm.emit({
  //     value: true,
  //   });
  //   this.visible = false;
  // }
  // protected decline() {
  //   console.log('modal decline');
  //   this.confirm.emit({
  //     value: false,
  //   });
  //   this.visible = false;
  // }
  // ------------------------------

  protected handler(result: string) {
    console.log(`modal ${result}`);
    // this.confirm.emit({
    //   value: result,
    // });
    // this.visible = false;
    this.modalWindowServices.answer(result);
  }
  get visible() {
    return this.modalWindowServices.visible;
  }
  get message() {
    return this.modalWindowServices.message;
  }
}
