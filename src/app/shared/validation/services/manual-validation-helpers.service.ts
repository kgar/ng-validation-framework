import { Subscription } from 'rxjs';
import { AbstractControl } from '@angular/forms';

export class ManualValidationHelpers {
  static linkManuallyValidatedGroup(
    sourceControl: AbstractControl,
    dependentControls: AbstractControl[],
  ): Subscription {
    return sourceControl.statusChanges.subscribe(() => {
      dependentControls.forEach(c => c.updateValueAndValidity({ onlySelf: true }));
    });
  }

  static triggerOneTimeValidationCheck(
    isValid: boolean,
    setter: (isValid: boolean) => void,
    sourceControl: AbstractControl,
  ): void {
    setter(isValid);
    sourceControl.updateValueAndValidity({ onlySelf: true });
    setter(true);
  }
}
