import { AbstractControl } from '@angular/forms';

const invalidCharacters: RegExp = /[\s\!\@\#\$\%\<\>\:\"\\\/\|\?\*\']+/;

export function fileNameCharactersOnlyValidator(
  control: AbstractControl,
): { [key: string]: any } | null {
  const value = control.value?.toString() as string;

  const controlHasValue = !['', null, undefined].includes(value);
  if (!controlHasValue) {
    return null;
  }

  const containsValidText = !invalidCharacters.test(value);
  return !containsValidText ? { fileNameCharactersOnly: true } : null;
}
