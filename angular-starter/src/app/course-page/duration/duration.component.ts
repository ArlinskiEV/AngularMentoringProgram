import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'duration-component',
  styles: [`
    :host>* {
      // border: 5px solid red;
    }
  `],
  template: `
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">{{titleString}}</span>
      </div>
      <input type="number" class="form-control"
      (change)="viewToValue($event.target.value)"
      [value]="valueToView(value)"
      (blur)="onTouched()"
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: DurationComponent, multi: true}],
})

export class DurationComponent implements ControlValueAccessor {
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

  private onChange = (_) => {};
  private onTouched = () => {};

  // ------------------------------------------------------------------
  // set & get date-component value
  private get value(): number {
    return this.currentValue;
  }

  // all other methods work with this
  private set value(newValue: number) {
    this.currentValue = newValue;
    this.onChange(newValue);
    this.changeDetectorRef.markForCheck();
  }
  // ------------------------------------------------------------------

  private viewToValue(value: number) {
    this.value = + new Date(value * 60000);
  }
  private valueToView(value: number): number {
    const result = new Date(value);
    return Math.round(value / 60000);
  }

}
// set/get value - work with currentValue + angular
