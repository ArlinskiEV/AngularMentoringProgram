import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { LoaderBlockServices } from './core';

@Component({
  selector: 'intro',
  templateUrl: './angular-intro.component.html',
  styleUrls: ['./angular-intro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class IntroComponent  implements OnInit {
  constructor(
    @Inject('load-spinner') private _loaderBlockServices: LoaderBlockServices,
  ) {}
  public ngOnInit() {
    console.log('hello `INTRO` component');
  }
}
