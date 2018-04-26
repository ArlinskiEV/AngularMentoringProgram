import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateAuthors(control: AbstractControl): ValidationErrors | null {
  console.warn(`author.value:${JSON.stringify(control.value)}`);
  return control.value && control.value.length ? null : {authors: true};
}
