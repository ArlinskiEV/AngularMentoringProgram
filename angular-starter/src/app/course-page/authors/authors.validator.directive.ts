import { Directive } from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { validateAuthors } from './authors.validator';

@Directive({
  selector: 'authors-component[authors-validator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AuthorsValidatorDirective, multi: true}]
})
export class AuthorsValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    return validateAuthors(control);
  }
}
