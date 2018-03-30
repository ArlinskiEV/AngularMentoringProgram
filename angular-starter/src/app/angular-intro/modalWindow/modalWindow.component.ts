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
    this.modalWindowServices.listenMe(

      new Observable((observer) => {
        this.data = this.modalWindowServices.data;
        this.visible = true;

        // --------- REALLY?????
        this.click = (text) => {
          observer.next(text ? text : 'Close');
          this.visible = false;
          observer.complete();
        };

      })

    );
  }
}
