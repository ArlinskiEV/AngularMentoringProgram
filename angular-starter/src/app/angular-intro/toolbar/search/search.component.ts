import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService, CourseServices } from '../../core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  protected searchText: string;

  constructor(
    private _searchService: SearchService,
    private _courseServices: CourseServices,
  ) {
    this.searchText = '';
  }

  public find() {
    console.log(`search:'${this.searchText}'`);
    // this._searchService.setSearchData(this.searchText
    //   ? [{field: 'name', compareWith: this.searchText}]
    //   : []
    // );

    // clean 14-day pre-set
    this._searchService.setSearchData([]);

    this._courseServices.search(this.searchText);
  }
}
