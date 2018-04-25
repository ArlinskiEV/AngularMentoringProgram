import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateDuration(control: AbstractControl): ValidationErrors | null {
  return control.value > 0 ? null : {duration: true};
}
