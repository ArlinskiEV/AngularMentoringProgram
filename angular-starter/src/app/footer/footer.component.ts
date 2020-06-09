import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: [
    './footer.component.css'
  ],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
