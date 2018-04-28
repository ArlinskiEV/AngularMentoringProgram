import {
  Directive,
  ElementRef,
  Input,
  Renderer,
  OnInit,
} from '@angular/core';

import { StyleRule } from '../entities';

@Directive({
  selector: '[appStylelight]',
})
export class StylelightDirective<T> implements OnInit {
  @Input() public payload: {
    data: T, // current data, for compare, [start, end)
    caseArr: [{data: T & {start: T, end: T}, setStyle: StyleRule[]}], // case array
  };
  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {}

  public ngOnInit() {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
    const current = this.payload.caseArr
      // find case for this data
      .find((item) => typeof item.data === typeof this.payload.data
        // if exact
        ? this.payload.data === item.data
        // if in interval
        : ((this.payload.data >= item.data.start)
          && ( this.payload.data < item.data.end))
      );
    if (current) {
      // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
      current.setStyle.forEach( (item) => {
        this.renderer.setElementStyle(this.el.nativeElement, item.rule, item.value);
      });
    }
  }
}
