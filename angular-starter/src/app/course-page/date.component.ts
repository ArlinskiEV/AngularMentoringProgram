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
      (change)="setValue($event.target.value)"
      placeholder="dd/MM/yyyy"
      [value]="valueToString(value)"
    >
    <p>value:{{value | json}}</p>
    <p>input: {{my.value}}</p>
  `,
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

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public writeValue(value: number): void {
    console.warn('write');
    this.value = value;
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange = (_) => {};
  private onTouched = () => {};

  // ------------------------------------------------------------------
  // set & get date-component value
  private get value(): number {
    console.warn('get');
    return this.currentValue;
  }

  // all other methods work with this
  private set value(newValue: number) {
    console.warn('set');
    this.currentValue = newValue;
    this.onChange(newValue);
    this.changeDetectorRef.markForCheck();
  }
  // ------------------------------------------------------------------

  // ------------------------------------------------------------------
  // work text-input with number-date
  private setValue(value: string) {
    console.warn('setValue');
    let newValue = null; // if format incorrect
    // check
    if (value.match(/^[0-2]?[0-9]\/[0,1]?[0-9]\/[1,2][0-9]{3}$/)) {
      const t = value.split('/');
      newValue = + new Date(`${t[2]}-${t[1]}-${t[0]}`); // YYYY-MM-DD
    }
    this.value = newValue;
  }
  private valueToString(value: number): string {
    console.warn('valueToString');
    const result = new Date(value);
    return `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`;
  }
  // ------------------------------------------------------------------
}
// input = text input dd/MM/yyyy format
// currentValue = real date-value, type = number, + new Date()
// set/get value - work with currentValue + angular
// setValue: view -> model
// valueToString: model -> view
