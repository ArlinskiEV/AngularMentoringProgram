import { ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  NgModule,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule, FormGroup } from '@angular/forms';
import { SearchService, CourseService } from '../../../core/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  constructor(
    private searchService: SearchService,
    private courseServices: CourseService,
  ) {}

  public submit(form: FormGroup) {
    console.warn(`search:'${form.value.query}'`);
    // this.searchService.setSearchData(this.searchText
    //   ? [{field: 'name', compareWith: this.searchText}]
    //   : []
    // );

    // set data
    this.searchService.setSearchData(form.value.query);

    // server-side search
    this.courseServices.search(form.value.query);

  // WTF ???? listener always is undefined???
  //   const listener: Subscription = this.searchService.getSearchData()
  //     // .first()
  //     // .finally(() => listener.unsubscribe())
  //     .subscribe((data) => {
  //       debugger;
  //       listener.unsubscribe();
  //       this.courseServices.search(data);
  //     })
  //   ;

  }
}
