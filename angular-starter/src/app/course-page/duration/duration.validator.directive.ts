import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { validateDuration } from './duration.validator';

@Directive({
  selector: 'duration-component[duration-validator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DurationValidatorDirective, multi: true}]
})
export class DurationValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return validateDuration(control);
  }
}
