import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  NgModule,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
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
