import { AbstractControl } from '@angular/forms';

export function numericValidator(control: AbstractControl) {
  if (isNaN(control.value)) {
    return { numeric: true };
  }

  return null;
}
