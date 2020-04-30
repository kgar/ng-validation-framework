import { AbstractControl } from '@angular/forms';

export function alphanumericValidator(control: AbstractControl): { [key: string]: any } | null {
  const text = control.value?.toString() as string;
  const containsValidText = /^[\w\s]*$/.test(text);
  return !containsValidText ? { alphanumeric: true } : null;
}
