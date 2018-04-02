import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';

import { LoaderBlockServices } from '../core/services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'loaderBlock',
  templateUrl: './loaderBlock.component.html',
  styleUrls: ['./loaderBlock.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBlockComponent implements OnInit {
  private visible = false;

  constructor(
    private _loaderBlockServices: LoaderBlockServices,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    console.log('LoaderBlockComponent constructor');
  }

  public ngOnInit() {
    console.log('LoaderBlockComponent ngOnInit');
    this._loaderBlockServices.source.asObservable().subscribe((payload) => {
      this.visible = payload.show;
      this._changeDetectorRef.markForCheck();
    });
  }
}
