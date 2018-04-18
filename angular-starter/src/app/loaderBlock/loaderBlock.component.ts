import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';

import { LoaderBlockService } from '../core/services';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'loaderBlock',
  templateUrl: './loaderBlock.component.html',
  styleUrls: ['./loaderBlock.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit, OnDestroy {
  private visible = false;
  private listener: Subscription;

  constructor(
    @Inject('load-spinner') private _loaderBlockService: LoaderBlockService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.listener = this._loaderBlockService.source.asObservable().subscribe((payload) => {
      this.visible = payload.show;
      this._changeDetectorRef.markForCheck();
    });
  }
  public ngOnDestroy() {
    this.listener.unsubscribe();
  }
}
