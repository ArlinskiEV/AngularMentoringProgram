import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateDate(control: AbstractControl): ValidationErrors | null {
  return control.value ? null : {date: true};
}
