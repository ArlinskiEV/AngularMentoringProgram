import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Router,
  RouterLink,
  Event,
  NavigationEnd,
  ActivatedRoute,
  Params,
  UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Course, BreadcrumbsService } from '../core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'breadcrumbs-component',
  styles: [`
   a {
     text-decoration: underline;
   }
   a:not(:first-of-type)::before {
     content: '>';
   }
   :host > div {
    align-items: center;
   }
  `],
  template: `
  <div>
  <h3>{{title}}</h3>
      <a
        *ngFor="let part of path index as i"
        (click)="goToPath(i)"
      >{{part.path}}</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// It should show current course name
// (not clickable) and link to courses page.
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public title: string = '';
  private params: Params;
  private path: UrlSegment[];
  private listeners: Subscription[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private breadcrumbsService: BreadcrumbsService,
  ) {}

  public ngOnInit() {

    this.listeners.push(
      this.router.events
        .filter((e: Event) => e instanceof NavigationEnd)
        .map((_) => this.activatedRoute.firstChild.url)
        .switch()

        .subscribe((data: UrlSegment[]) => {
          this.path = [...data];
          this.changeDetectorRef.markForCheck();
        })
    );

    this.listeners.push(
      this.breadcrumbsService.getSource()
        .subscribe(
          (title: string) => {
            this.title = title;
            this.changeDetectorRef.markForCheck();
          },
        )
    );
  }

  public goToPath(index: number) {
    const url = this.path
      .slice(0, index + 1)
      .map((item) => item.path)
    ;
    console.warn(`url=${url}`);
    this.router.navigate(url);
  }

  public ngOnDestroy() {
    this.listeners.forEach((item) => item.unsubscribe());
  }
}
