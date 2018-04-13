import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateComponent),
  multi: true
};

@Component({
  selector: 'date-component',
  styles: [`
    :host>* {
      border: 5px solid red;
    }
  `],
  template: `
    <input type="text"
      #my
      (change)="setValue($event)"
      placeholder="dd/MM/yyyy"
      [value]="value"
    >
    <p>date:{{value | json}}</p>
    <p>value:{{value | json}}</p>
    <p>date2: {{value | date:'dd/MM/yyyy'}}</p>
    <p>input: {{my.value}}</p>
  `,
  // [value]="value | date:'dd/MM/yyyy'
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_DATE_VALUE_ACCESSOR],
})
/*
Text input.
Date format should be dd/MM/yyyy
Implement ng_value_accessor and ng_validators
Datetime as return value.
In case of wrong format return null.
*/
export class DateComponent implements ControlValueAccessor {
  private currentValue: number; // +new Date()

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  public writeValue(value: number): void {
    console.warn(`writeValue:${value}`);
    if (value !== this.currentValue) {
      // this.setValue(value);
      this.currentValue = value;
    }
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ...it isn't so necessarily as she said
  // public setDisabledState(isDisabled: boolean): void {
  //   console.warn('');
  // }

  private onChange = (_) => {};
  private onTouched = () => {};

  // -----------------------------------------------------
  // -----------------------------------------------------

  private set value(newValue: string) {
    console.warn(`set date:${newValue}`);

    this.currentValue = null;
    // check
    if (newValue.match(/^[0-2]?[0-9]\/[0,1]?[0-9]\/[1,2][0-9]{3}$/)) {
      const t = newValue.split('/');
      this.currentValue = + new Date(`${t[2]}-${t[1]}-${t[0]}`); // YYYY-MM-DD
      console.warn(`check:true:${this.currentValue}`);
    }
    this.onChange(this.value); // string only for view

    this._changeDetectorRef.markForCheck();
  }

  private get value(): string {
    const result = new Date(this.currentValue);
    console.warn(`get date:${this.currentValue}`);
    console.warn(`result=${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`);
    return this.currentValue
      ? `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`
      : ''
    ;
  }

  private setValue(item) {
    console.warn(`setValue:${item.target.value}`);
    this.value = item.target.value;
  }

}
// input = text input dd/MM/yyyy format
// value = real date-value, type = number, + new Date()
// date = getter/setter string-value, only for view. transform text to number
// setValue = setter for it
