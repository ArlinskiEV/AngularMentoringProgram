import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchService, CourseService } from '../../core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  protected searchText: string = '';

  constructor(
    private searchService: SearchService,
    private courseServices: CourseService,
  ) {}

  public find() {
    console.log(`search:'${this.searchText}'`);
    // this._searchService.setSearchData(this.searchText
    //   ? [{field: 'name', compareWith: this.searchText}]
    //   : []
    // );

    // clean 14-day pre-set
    this.searchService.setSearchData([]);

    this.courseServices.search(this.searchText);
  }
}
