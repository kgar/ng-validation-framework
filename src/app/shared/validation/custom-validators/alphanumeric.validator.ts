import { AbstractControl } from '@angular/forms';

export function AlphanumericValidator(control: AbstractControl): { [key: string]: any } | null {
  const text = control.value?.toString() as string;
  const containsInvalidText = /\W/gi.test(text);
  return containsInvalidText ? { alphanumeric: true } : null;
}
