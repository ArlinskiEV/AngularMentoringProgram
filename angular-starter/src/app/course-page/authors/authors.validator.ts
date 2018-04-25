import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateAuthors(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value.length ? null : {date: true};
}
