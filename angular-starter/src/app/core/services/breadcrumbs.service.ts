import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Course } from '../entities';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class BreadcrumbsService {
  private source = new BehaviorSubject('');

  public setSource(newSource: Observable<string>) {
    const listener: Subscription = newSource.subscribe(
      (text: string) => this.source.next(text),
      null,
      () => listener.unsubscribe()
    );
  }

  public getSource(): Observable<string> {
    return this.source.asObservable();
  }
}
