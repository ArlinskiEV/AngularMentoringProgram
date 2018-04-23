import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

@Directive({
  selector: '[date-validator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true}]
})
export class DateValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    console.warn(`val:${control.value}`);
    return control.value ? null : {date: true};
  }
}
