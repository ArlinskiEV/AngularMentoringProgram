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
  private click: (answer: string) => void;
  private visible = false;
  private data = {
    message: 'NoMessage',
    answerArr: ['Yes', 'No'],
  };
  constructor(private modalWindowServices: ModalWindowServices) {
    console.log('ModalWindowComponent constructor');
  }

  public ngOnInit() {
    console.log('ModalWindowComponent ngOnInit');
    this.source = new Observable((observer) => {
      this.data = this.modalWindowServices.data;
      this.visible = true;

      this.doIt = new Promise((res, rej) => {
        // ----------------------------------------- REALLY?????
        this.click = (text) => res(text ? text : 'Close');
        // -----------------------------------------------------
      });
      this.doIt
        .then((result) => {
          observer.next(result);
        })
        .then(() => {
          this.visible = false;
          observer.complete();
        });
    });

    this.modalWindowServices.listenMe(this.source);
  }
}
