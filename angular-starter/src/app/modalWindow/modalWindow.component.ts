import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { HostListener } from '@angular/core';

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
  public visible = false;
  public message: string;
  public default: Answer;
  public answerArr: Answer[];
  private listener: Subscription;

  constructor(
    private modalWindowService: ModalWindowService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.listener = this.modalWindowService.getData().subscribe((data) => {
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

  public click(answer: Answer)  {
    this.visible = false;
    this.changeDetectorRef.markForCheck();
    this.modalWindowService.answer(answer);
  }

  @HostListener('document:keyup.esc', ['$event'])
  public onKeyUp(ev: KeyboardEvent) {
    this.click(this.default);
  }

}
