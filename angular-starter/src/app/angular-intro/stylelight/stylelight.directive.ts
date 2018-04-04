import {
  Directive,
  ElementRef,
  Input,
  Renderer,
  OnInit,
} from '@angular/core';

import { StyleRule } from '../core/entities';

@Directive({
  selector: '[appStylelight]',
})
export class StylelightDirective<T> implements OnInit {
  @Input() public payload: {
    data: T, // current data, for compare, [start, end)
    caseArr: [{data: T & {start: T, end: T}, setStyle: StyleRule[]}], // case array
  };
  constructor(
    private _el: ElementRef,
    private _renderer: Renderer
  ) {}

  public ngOnInit() {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
    const current = this.payload.caseArr
      .find((item) => typeof item.data === typeof this.payload.data
        ? this.payload.data === item.data
        : ((this.payload.data >= item.data.start)
          && ( this.payload.data < item.data.end))
      );
    if (current) {
      // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
      current.setStyle.forEach( (item) => {
        this._renderer.setElementStyle(this._el.nativeElement, item.rule, item.value);
      });
    }
  }
}
