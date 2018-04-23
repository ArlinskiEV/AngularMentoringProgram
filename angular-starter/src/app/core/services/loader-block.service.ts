import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderBlockService {

  public source = new BehaviorSubject({show: false});
  private show = false;

  public Show() {
    this.show = true;
    this.source.next({show: this.show});
  }

  public Hide() {
    this.show = false;
    this.source.next({show: this.show});
  }

}
