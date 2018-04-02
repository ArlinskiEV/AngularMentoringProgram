import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderBlockServices {

  public source: BehaviorSubject<any>;
  private show = false;

  constructor() {
    console.log('### LoaderBlockServices constructor ###');
    this.source = new BehaviorSubject({show: false});
  }

  public Show() {
    this.show = true;
    this.source.next(this.show);
  }

  public Hide() {
    this.show = false;
    this.source.next(this.show);
  }

}
