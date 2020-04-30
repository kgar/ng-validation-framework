import { AbstractControl } from '@angular/forms';

export function notEmptyListValidator(control: AbstractControl) {
  return control.value?.length > 0 ? null : { notEmptyList: true };
}
