import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthorizationService } from '../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public localState: any;
  @Input() protected owner: string;

  constructor(
    public route: ActivatedRoute,
    private authorizationService: AuthorizationService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    console.log('HeaderComponent constructor');
  }

  get isAuth() {
    return this.authorizationService.isAuthenticated();
  }

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        /**
         * Your resolved data from route.
         */
        this.localState = data.yourData;
      });

    console.log('hello `Header` component');
    // because auth-info must be actual
    this.authorizationService.source.subscribe(
      () => this.changeDetectorRef.markForCheck(),
    );
    /**
     * static data that is bundled
     * var mockData = require('assets/mock-data/mock-data.json');
     * console.log('mockData', mockData);
     * if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
     */
    this.asyncDataWithWebpack();
  }
  private asyncDataWithWebpack() {
    /**
     * you can also async load mock data with 'es6-promise-loader'
     * you would do this if you don't want the mock-data bundled
     * remember that 'es6-promise-loader' is a promise
     */
    setTimeout(() => {

      // System.import('../../assets/mock-data/mock-data.json')
      System.import('../../../assets/mock-data/mock-data.json')
        .then((json) => {
          console.log('async mockData', json);
          this.localState = json;
        });

    });
  }

}
