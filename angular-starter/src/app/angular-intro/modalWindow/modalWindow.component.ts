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
  protected doIt: Promise<string>;
  private data: any;
  constructor(private modalWindowServices: ModalWindowServices) {
    console.log('ModalWindowComponent constructor');

    // --------------------------------block
    const obj = this.modalWindowServices.data.answerArr
          .map((item) => {
            return {click: () => item, text: item};
          });

    this.data = {
      ...this.modalWindowServices.data,
      visible: false,
      answerArr: obj,
    };
    // -------------------------------------
  }

  public ngOnInit() {
    console.log('ModalWindowComponent ngOnInit');
    this.source = new Observable((observer) => {
      console.warn('observ in modal-comp');
      // console.log('observable in modalWindowComponent');

      // -----------------------------------------------------
      this.doIt = new Promise((res, rej) => {
        console.log('getter data');
        this['bad'] = () => res('Close');
        const obj = this.modalWindowServices.data.answerArr
          .map((item) => {
            return {click: () => res(item), text: item}; /// REALLY?????
          });

        this.data = {
          ...this.modalWindowServices.data,
          visible: true,
          answerArr: obj,
        };
      });
      // -----------------------------------------------------
      this.doIt
        .then((result) => {
          observer.next(result);
        })
        .then(() => {
          this.data.visible = false;
          observer.complete();
        });
    });

    this.modalWindowServices.listenMe(this.source);
  }

  protected handler(result: string) {
    console.log(`modal: ${result}`);
    this['bad']();
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

//

  // get data() {
  //   console.log('getter data');
  //   const obj = this.modalWindowServices.data.answerArr
  //       .map((item) => {
  //         return {click: () => this.handler(item), text: item};
  //       });

  //   const t = 1;

  //   return {
  //     ...this.modalWindowServices.data,
  //     answerArr: obj,
  //   };
  // }
}
