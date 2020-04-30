import { Subscription } from 'rxjs';
import { AbstractControl } from '@angular/forms';

export class ManualValidationHelpers {
  /**
   * Causes changes to the source control to also trigger a validity update
   * on the specified dependent controls.
   *
   * After dependent controls are updated,
   * the source control self-updates without emitting events.
   *
   * @param sourceControl the control to watch for status changes
   * @param dependentControls the control(s) to trigger an update on value and validity
   */
  static linkManuallyValidatedGroup(
    sourceControl: AbstractControl,
    dependentControls: AbstractControl[],
  ): Subscription {
    return sourceControl.statusChanges.subscribe(() => {
      dependentControls.forEach((c) => {
        c.updateValueAndValidity({ onlySelf: true });
      });
      sourceControl.updateValueAndValidity({ emitEvent: false });
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
