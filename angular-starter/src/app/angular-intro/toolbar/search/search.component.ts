import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  protected searchText: string;

  constructor() {
    this.searchText = '';
  }

  public find() {
    console.log(`search:'${this.searchText}'`);
  }
}
