import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { ModalWindowService } from '../core/services';
import { ModalRule } from '../core/entities';

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
  private answerArr: string[];

  constructor(
    private _modalWindowService: ModalWindowService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.data = this._modalWindowService.data;
    this.listener = this.data.subscribe((data) => {
      this.visible = true;
      this.message = data.message;
      this.answerArr = data.answerArr;
      this._changeDetectorRef.markForCheck();
    });
  }

  public ngOnDestroy() {
    this.listener.unsubscribe();
  }

  private click(answer: string)  {
    this.visible = false;
    this._changeDetectorRef.markForCheck();
    this._modalWindowService.answer(answer ? answer : 'Close');
  }

}
