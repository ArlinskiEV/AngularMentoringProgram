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
  private click: (answer: string) => void;
  private visible: boolean;
  private data = {
    message: 'NoMessage',
    answerArr: ['Yes', 'No'],
  };
  constructor(
    private _loaderBlockServices: LoaderBlockServices,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    console.log('LoaderBlockComponent constructor');
  }

  public ngOnInit() {
    console.log('LoaderBlockComponent ngOnInit');
    this._loaderBlockServices.source.asObservable().subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }
}
