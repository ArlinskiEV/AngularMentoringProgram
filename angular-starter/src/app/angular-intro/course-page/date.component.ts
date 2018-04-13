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
      [value]="date"
    >
    <p>date:{{date | json}}</p>
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
  public value: number; // +new Date()

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  public writeValue(value: number): void {
    console.warn(`writeValue:${value}`);
    if (value !== this.value) {
      this.value = value;
    }
  }
  public registerOnChange(fn: any): void {
    this.onChange = (_) => {
      fn(_);
      // this._changeDetectorRef.markForCheck();
    };
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = () => {
      fn();
      // this._changeDetectorRef.markForCheck();
    };
  }

  // ...it isn't so necessarily as she said
  // public setDisabledState(isDisabled: boolean): void {
  //   console.warn('');
  // }

  private onChange = (_) => {};
  private onTouched = () => {};

  // -----------------------------------------------------
  // -----------------------------------------------------

  private set date(newValue: string) {
    console.warn(`set date:${newValue}`);

    this.value = null;
    // check
    if (newValue.match(/^[0-2]?[0-9]\/[0,1]?[0-9]\/[1,2][0-9]{3}$/)) {
      const t = newValue.split('/');
      this.value = + new Date(`${t[2]}-${t[1]}-${t[0]}`); // YYYY-MM-DD
      console.warn(`check:true:${this.value}`);
    }
    this.onChange(this.value); // string only for view

    this._changeDetectorRef.markForCheck();
  }

  private get date(): string {
    const result = new Date(this.value);
    console.warn(`get date:${this.value}`);
    console.warn(`result=${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`);
    return this.value
      ? `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`
      : 'wrong'
    ;
  }

  private setValue(item) {
    console.warn(`setValue:${item.target.value}`);
    this.date = item.target.value;
  }

}
// input = text input dd/MM/yyyy format
// value = real date-value, type = number, + new Date()
// date = getter/setter string-value, only for view. transform text to number
// setValue = setter for it
