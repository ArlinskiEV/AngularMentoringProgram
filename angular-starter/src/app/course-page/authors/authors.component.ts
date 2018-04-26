import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Author } from '../../core/entities';

@Component({
  selector: 'authors-component',
  styles: [``],
  template: `
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">{{titleString}}</span>
      </div>
      <select multiple class="form-control" size="8"
        (blur)="onTouched()"
        [(ngModel)]="value"
      >
        <option
          *ngFor="let author of authorsList"
          [ngValue]="author"
        >{{author.id}} {{author.name.first}} {{author.name.last}}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: AuthorsComponent, multi: true}],
})

export class AuthorsComponent implements ControlValueAccessor {
  @Input() public titleString: string = 'myAythors';
  @Input() public authorsList: Author[] = [];
  private currentValue: Author[]; // checked Author

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public writeValue(newValue: Author[]): void {
    // do not call onChange -> prestine
    if (newValue) {
      // this.currentValue = [...newValue];
      // for right checked-state
      this.currentValue = this.authorsList
        .filter((author) => newValue
          .some((item) => author.id === item.id)
        )
      ;
      this.changeDetectorRef.markForCheck();
    }
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
  public get value(): Author[] {
    return this.currentValue;
  }

  // all other methods work with this
  public set value(newValue: Author[]) {
    this.currentValue = this.authorsList
      .filter((author) => newValue
        .some((item) => author.id === item.id)
      )
    ;
    this.onChange(newValue);
    this.changeDetectorRef.markForCheck();
  }

}
// set/get value - work with currentValue + angular
