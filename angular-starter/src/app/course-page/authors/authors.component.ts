import {
  Component,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Input,
  OnInit,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup, FormControl } from '@angular/forms';
import { Author } from '../../core/entities';
import { Subscription } from 'rxjs/Subscription';

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
          *ngFor="let author of fullAuthorsList"
          [ngValue]="author"
        >{{author.id}} {{author.name.first}} {{author.name.last}}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: AuthorsComponent, multi: true}],
})

export class AuthorsComponent implements ControlValueAccessor, OnInit {
  @Input() public titleString: string = 'myAythors';
  public fullAuthorsList: Author[] = [];
  @Input() public authorsList: Observable<Author[]>;

  // public myControl: FormControl = new FormControl([]);
  // [formControl]="myControl"

  private currentValue: Author[] = []; // checked Author

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit() {
    const listener: Subscription = this.authorsList
      .finally(() => listener.unsubscribe())
      .subscribe((list) => {
        this.fullAuthorsList = list;
        this.currentValue = this.fullAuthorsList
        .filter((author) => this.currentValue
          .some((item) => author.id === item.id)
        )
      ;
      });
  }

  public writeValue(newValue: Author[]): void {
    // do not call onChange -> prestine
    if (newValue) {
      if (!this.fullAuthorsList.length) {
        this.currentValue = [...newValue];
      } else {
        // for right checked-state
        this.currentValue = this.fullAuthorsList
          .filter((author) => newValue
            .some((item) => author.id === item.id)
          )
        ;
      }
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
    this.currentValue = this.fullAuthorsList
      .filter((author) => newValue
        .some((item) => author.id === item.id)
      )
    ;
    this.onChange(this.value);
    this.changeDetectorRef.markForCheck();
  }

}
// set/get value - work with currentValue + angular
