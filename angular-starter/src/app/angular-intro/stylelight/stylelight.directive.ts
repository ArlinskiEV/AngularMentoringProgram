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
export class StylelightDirective implements OnInit {
  @Input() public payload: {
    data: any, // current data, for compare
    caseArr: [{data: any, setStyle: StyleRule[]}], // case array
  };
  constructor(
    private _el: ElementRef,
    private _renderer: Renderer
  ) {}

  public ngOnInit() {
    // this.el.nativeElement.style.backgroundColor = 'yellow';
    const current = this.payload.caseArr
      .find((item) => item.data <= this.payload.data);
    if (current) {
      // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
      current.setStyle.forEach( (item) => {
        this._renderer.setElementStyle(this._el.nativeElement, item.rule, item.value);
      });
    }
  }
}
