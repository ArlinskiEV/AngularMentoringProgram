import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Course } from '../entities';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class BreadcrumbsService {
  private source = new BehaviorSubject(new Course());

  public setSource(newSource: Observable<Course>) {
    const listener: Subscription = newSource.subscribe(
      (course: Course) => this.source.next(course),
      null,
      () => listener.unsubscribe()
    );
  }

  public getSource(): Observable<Course> {
    return this.source.asObservable();
  }
}
