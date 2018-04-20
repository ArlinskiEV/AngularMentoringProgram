import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'breadcrumbs-component',
  styles: [`
  `],
  template: `
    <div>
      <p>breadcrumbs</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BreadcrumbsComponent {}
