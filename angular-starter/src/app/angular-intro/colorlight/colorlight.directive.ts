import {
  Directive,
  ElementRef,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appColorlight]',
})
export class ColorlightDirective {
  @Input() public payload: {
    data: any, // current data, for compare
    caseArr: [{data: any, color: string}], // case array
  };
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
