import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

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
export class PageNotFoundComponent {}
