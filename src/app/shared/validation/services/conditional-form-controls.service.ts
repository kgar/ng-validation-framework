import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

/**
 * A form control whose name is specified so that it can be dynamically referred to later.
 */
export interface MonitoredFormControl {
  name: string;
  control: AbstractControl;
}

/**
 * A dictionary of the controls:
 * - key: the watched control's value
 * - value: 1 or more form controls to include in the form group when the key matches
 *
 * The same form control can show in multiple places.
 */
export type FormControlGroupDictionary = { [key: string]: MonitoredFormControl[] };

/**
 * The plan which is used to apply dynamic control addition/removal.
 */
export interface ConditionalValidationPlan {
  targetFormGroup: FormGroup;
  controlDictionary: FormControlGroupDictionary;
  defaultCase?: MonitoredFormControl[];
}

/**
 * Removes all form controls specified in the plan's control dictionary.
 * Adds back whatever controls it finds when looking for an entry whose key matches the value arg.
 * @param value The value to use when looking up which controls to add back to the target form group.
 * @param plan The plan to use when managing conditional validation for a single form group.
 */
export function toggleConditionalFormControls(value: string, plan: ConditionalValidationPlan) {
  const allMonitoredFormControls = getAllMonitoredFormControls(plan);

  removeAllMonitoredFormControls(allMonitoredFormControls, plan);

  const entryToUse = plan.controlDictionary[value] || plan.defaultCase;

  entryToUse?.forEach((c) => plan.targetFormGroup.addControl(c.name, c.control));
}

function getAllMonitoredFormControls(plan: ConditionalValidationPlan) {
  const monitoredFormControlArrays = Object.values(plan.controlDictionary);
  if (plan.defaultCase !== undefined) {
    monitoredFormControlArrays.push(plan.defaultCase);
  }
  const allMonitoredFormControls = monitoredFormControlArrays.reduce(
    (left, right) => left.concat(right),
    [],
  );
  return allMonitoredFormControls;
}

function removeAllMonitoredFormControls(
  allMonitoredFormControls: MonitoredFormControl[],
  plan: ConditionalValidationPlan,
) {
  allMonitoredFormControls.forEach((c) => {
    const controlToRemove = plan.targetFormGroup.controls[c.name];
    if (controlToRemove === undefined) return;
    controlToRemove.markAsUntouched({ onlySelf: true });
    plan.targetFormGroup.removeControl(c.name);
  });
}

/**
 * Sets up monitoring on a given control.
 * The control's value will be converted to a string and then sent to @function toggleConditionalFormControls with the validation plan.
 * After setting up change detection, applies the initial toggle to the form group.
 *
 * @param controlToWatch The control whose value changes should be monitored
 * @param plan The plan to use when managing conditional validation for a single form group
 */
export function monitorAndToggleFormControls(
  controlToWatch: AbstractControl,
  plan: ConditionalValidationPlan,
) {
  const subscription = controlToWatch.valueChanges.subscribe((value) => {
    toggleConditionalFormControls(value.toString(), plan);
  });

  toggleConditionalFormControls(controlToWatch.value.toString(), plan);

  return subscription;
}
