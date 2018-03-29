import {
  Component, OnInit,
} from '@angular/core';

import { ModalWindowServices } from '../core/services/modalWindow.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'modalWindow',
  templateUrl: './modalWindow.component.html',
  styleUrls: ['./modalWindow.component.css']
})
export class ModalWindowComponent implements OnInit {
  protected source: Observable<string>;
  protected doIt: () => string;
  constructor(private modalWindowServices: ModalWindowServices) {
    console.log('ModalWindowComponent constructor');
    this.doIt = () => 'constructor';
  }

  public ngOnInit() {
    console.log('ModalWindowComponent ngOnInit');
    this.source = new Observable((observer) => {
      console.warn('observ in modal-comp');
      console.log('observable in modalWindowComponent');
      // observer.next('hello from observable modalWindowComponent');
      console.warn(`modal-window-comp: ${this['doIt']()}`);

      // observer.next(this['doIt']());
      // observer.complete();
      // console.warn('observ end in modal-comp');

      setTimeout(() => observer.next(this['doIt']()), 10000);
    });

    this.modalWindowServices.listenMe(this.source);
  }

  protected handler(result: string) {
    console.log(`modal: ${result}`);
    // this.modalWindowServices.answer(result);
    this.doIt = () => result;
  }
  protected close() {
    console.log(`modalWindowComponent: modal was closed without answer`);
    // this.modalWindowServices.answer('Close');
    this.doIt = () => 'Close';
  }
  // get visible() {
  //   return this.modalWindowServices.visible;
  // }
  // get message() {
  //   return this.modalWindowServices.message;
  // }
  // get answerArr() {
  //   return this.modalWindowServices.answerArr
  //     .map((item) => {
  //       return {click: () => this.handler(item), text: item};
  //     });
  // }

  get data() {
    const obj = this.modalWindowServices.data.answerArr
        .map((item) => {
          return {click: () => this.handler(item), text: item};
        });

    const t = 1;

    return {
      ...this.modalWindowServices.data,
      answerArr: obj,
    };
  }
}
