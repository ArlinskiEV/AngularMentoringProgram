import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'date-component',
  styles: [``],
  template: `
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">{{titleString}}</span>
      </div>
      <input type="text" class="form-control"
      (change)="viewToValue($event.target.value)"
      placeholder="dd/MM/yyyy"
      [value]="valueToView(value)"
      (blur)="onTouched()"
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: DateComponent, multi: true}],
})
/*
Text input.
Date format should be dd/MM/yyyy
Implement ng_value_accessor and ng_validators
Datetime as return value.
In case of wrong format return null.
*/
export class DateComponent implements ControlValueAccessor {
  @Input() public titleString: string = 'myDate';
  private currentValue: number; // +new Date()

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public writeValue(value: number): void {
    // do not call onChange -> prestine
    this.currentValue = value;
    this.changeDetectorRef.markForCheck();
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onChange = (_) => {};
  public onTouched = () => {};

  // ------------------------------------------------------------------
  // set & get date-component value
  public get value(): number {
    return this.currentValue;
  }

  // all other methods work with this
  public set value(newValue: number) {
    this.currentValue = newValue;
    this.onChange(newValue);
    this.changeDetectorRef.markForCheck();
  }
  // ------------------------------------------------------------------

  // ------------------------------------------------------------------
  // work text-input with number-date
  public viewToValue(value: string) {
    let newValue = null; // if format incorrect
    // check
    if (value.match(/^[0-2]?[0-9]\/[0,1]?[0-9]\/[1,2][0-9]{3}$/)) {
      newValue = + new Date(value.split('/').reverse().join('-')); // YYYY-MM-DD
    }
    this.value = newValue;
  }
  public valueToView(value: number): string {
    const result = new Date(value);
    return `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`;
  }
  // ------------------------------------------------------------------
}
// input = text input dd/MM/yyyy format
// currentValue = real date-value, type = number, + new Date()
// set/get value - work with currentValue + angular
