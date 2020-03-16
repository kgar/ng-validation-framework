import { ValidatorFn, AbstractControl } from '@angular/forms';

export function InvalidTextValidator(invalidText: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const invalidTextDetected =
      (control.value?.toString() as string)?.toLocaleLowerCase() ===
      invalidText.toLocaleLowerCase();
    return invalidTextDetected ? { invalidText: { value: control.value } } : null;
  };
}
