import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

import { LoaderBlockServices } from '../core/services';
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
    private _loaderBlockServices: LoaderBlockServices,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.listener = this._loaderBlockServices.source.asObservable().subscribe((payload) => {
      this.visible = payload.show;
      this._changeDetectorRef.markForCheck();
    });
  }
  public ngOnDestroy() {
    this.listener.unsubscribe();
  }
}
