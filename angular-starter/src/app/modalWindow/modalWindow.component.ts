import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { ModalWindowService } from '../core/services';
import { ModalRule, Answer } from '../core/entities';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'modalWindow',
  templateUrl: './modalWindow.component.html',
  styleUrls: ['./modalWindow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  private visible = false;
  private listener: Subscription;
  private data: Observable<ModalRule>;
  private message: string;
  private default: Answer;
  private answerArr: Answer[];

  constructor(
    private modalWindowService: ModalWindowService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.data = this.modalWindowService.data;
    this.listener = this.data.subscribe((data) => {
      this.visible = true;
      this.message = data.message;
      this.answerArr = data.answerArr;
      this.default = data.default
        ? data.default
        : {title: 'Cancel', value: -1};
      this.changeDetectorRef.markForCheck();
    });
  }

  public ngOnDestroy() {
    this.listener.unsubscribe();
  }

  private click(answer: Answer)  {
    this.visible = false;
    this.changeDetectorRef.markForCheck();
    this.modalWindowService.answer(answer);
  }

}
