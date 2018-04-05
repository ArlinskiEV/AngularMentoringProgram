import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  protected searchText: string;

  constructor(
    private _searchService: SearchService
  ) {
    this.searchText = '';
  }

  public find() {
    console.log(`search:'${this.searchText}'`);
    this._searchService.setSearchData(this.searchText
      ? [{field: 'name', compareWith: this.searchText}]
      : []
    );
  }
}
