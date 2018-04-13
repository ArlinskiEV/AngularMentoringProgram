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
      border: 5px solid black;
    }
    :host .control {
      border: 3px solid green;
      display: flex;
    }
    :host .control .item {
      color: black;
      border-radius: 50%;
      background-color: gray;
      width: 50px;
      height: 50px;
      text-align: center;
    }
    :host .control .item.red {
      background-color: red;
    }
    :host .control .item.green {
      background-color: green;
    }
    :host .control .item.blue {
      background-color: blue;
    }
    :host .control div.item.checked {
      border-radius: 0;
    }
  `],
  template: `
    <div>
      <p>value: {{value | json}}</p>
      <div class="control">
        <div [ngClass]="{'checked':(value==0), 'item':true, 'red':true}">
          <p>red</p>
        </div>
        <div [ngClass]="{'checked':(value==1), 'item':true, 'green':true}">
          <p>green</p>
        </div>
        <div [ngClass]="{'checked':(value==2), 'item':true, 'blue':true}">
          <p>blue</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_TEST_VALUE_ACCESSOR],
})

export class TestComponent implements ControlValueAccessor {
  public value: number; // undefined/0/1/2

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
    // this.value = undefined;
    this.value = 1;
  }

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

  private onChange = (_) => {};
  private onTouched = () => {};

  // -----------------------------------------------------
  // -----------------------------------------------------

}
