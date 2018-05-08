import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { validateDate } from './date.validator';

@Directive({
  selector: 'date-component[date-validator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true}]
})
export class DateValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return validateDate(control);
  }
}
