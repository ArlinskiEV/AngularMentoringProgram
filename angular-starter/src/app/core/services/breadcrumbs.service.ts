import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Course } from '../entities';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class BreadcrumbsService {
  private source = new BehaviorSubject('');
  private listener: Subscription;

  public setSource(newSource: Observable<string>) {
    if (this.listener) {
      this.listener.unsubscribe();
    }

    this.listener = newSource.subscribe(
      (text: string) => this.source.next(text),
    );
  }

  public getSource(): Observable<string> {
    return this.source.asObservable();
  }
}
