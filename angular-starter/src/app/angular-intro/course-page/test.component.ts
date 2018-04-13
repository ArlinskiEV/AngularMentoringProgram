import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_TEST_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TestComponent),
  multi: true
};

@Component({
  selector: 'test-component',
  styles: [`
    :host>div {
      border: 3px solid green;
      margin: 15px;
      padding: 15px;
    }
    :host>div.dis {
      opacity: 0.3;
    }
    :host .control {
      display: flex;
    }
    :host .control .item {
      margin: 5px;
      color: black;
      border-radius: 50%;
      background-color: gray;
      width: 50px;
      height: 50px;
      text-align: center;
    }
    :host .control div.item.checked {
      border-radius: 0;
    }
  `],
  template: `
    <div
      [ngClass]="{'dis': dis}"
    >
      <p>value: -{{value | json}}-</p>
      <div class="control">
        <div
          *ngFor="let item of arrItem; index as i"
          [ngClass]="{'checked':(value==i), 'item':true}"
          [ngStyle]="{'background-color': item}"
          tabindex="-1"
          (click)="setValue(i)"
        >
          <p>{{item}}</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_TEST_VALUE_ACCESSOR],
})

export class TestComponent implements ControlValueAccessor {
  public value: number;

  private arrItem: string[];
  private dis: boolean;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    this.dis = false;
    this.arrItem = ['red', 'green', 'blue'];
  }

  public writeValue(value: number): void {
    console.warn(`writeValue:${value}`);
    if (value !== this.value) {
      this.setValue(value);
    }
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState(isDisabled: boolean): void {
    this.dis = isDisabled;
  }

  private onChange = (_) => {};
  private onTouched = () => {};

  // -----------------------------------------------------
  // -----------------------------------------------------
  private setValue(newValue: number) {
    if (this.value !== newValue) {
      this.value = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }

}
