import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BreadcrumbsService } from '../core';

@Component({
  selector: 'app-notFound',
  styles: [`
    h2 {
      text-align: center;
    }
  `],
  template: `
    <h2>ERROR: 404<h2>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private breadcrumbsService: BreadcrumbsService
  ) {}
  public ngOnInit() {
    this.breadcrumbsService.setSource(Observable.of('404: Not found'));
  }
}
