import { ValidatorFn, AbstractControl } from '@angular/forms';
import { TextMustMatchArgs } from './text-must-match-args.model';

export function TextMustMatchValidator(args: TextMustMatchArgs): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const controlsMatch = (control.value?.toString() as string) === args.targetToMatch.value;
    return !controlsMatch ? { textMustMatch: { value: args.targetDisplayName } } : null;
  };
}
