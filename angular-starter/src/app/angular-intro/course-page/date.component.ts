import {
  Component, ChangeDetectionStrategy, forwardRef, Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_DATE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateComponent),
  multi: true
};

@Component({
  selector: 'date-component',
  template: `
    <input type="text"
      (change)="setValue($event)"
      placeholder="dd/MM/yyyy"
      [value]="date"
    >
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
  @Input() public value: number; // +new Date()

  public writeValue(value: number): void {
    console.warn(`writeValue:${value}`);
    if (value !== this.value) {
      this.value = value;
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

  public set date(newValue: string) {
    if (newValue) {
      this.value = + new Date(newValue);
      this.onChange(this.value);
    }
  }

  public get date(): string {
    const result = new Date(this.value);
    return `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`;
  }

  private setValue(item) {
    this.value = item.target.value;
  }

}
// input = text input dd/MM/yyyy format
// value = real date-value, type = number, + new Date()
// date = getter/setter string-value, only for view. transform text to number
// setValue = setter for it
