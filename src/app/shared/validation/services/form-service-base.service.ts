import { FormService } from '../models/form-service.model';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { concatMap, take, map } from 'rxjs/operators';
import { Patchable } from '../models/patchable.model';

/**
 * Strategy-based class meant to handle many of
 * the common boilerplate steps involved in managing a reactive form.
 *
 * Use when creating form services for components that feature a reactive form.
 */
export abstract class FormServiceBase<TFormModel> implements FormService {
  protected formSubscriptions: Subscription[] = [];
  public formGroup: FormGroup;

  /**
   * Represents the initialization of the top-level form group.
   * Ensures that the form group will be ready for use after this function is called.
   */
  abstract init(...params: any): void;

  /**
   * Performs reactive-forms-based validation steps for the most common use cases.
   *
   * It is meant to be called by the consuming component before form submission.
   *
   * Handles all submission-time validation tasks, including
   * - a full synchronous validation check
   * - asynchronous validation check(s)
   *
   * The observable returns
   * - *true* when the form is valid
   * - *false* when validation fails
   * - an error when an error occurs during async validation
   */
  public validate(): Observable<boolean> {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (!this.formGroup.valid) {
      return of(false);
    }

    return this.buildAsyncValidationAttempt();
  }

  private buildAsyncValidationAttempt(): Observable<boolean> {
    return this.validateAsync().pipe(
      concatMap(() => {
        return of(this.formGroup.valid);
      }),
      take(1),
    );
  }

  /**
   * Allows for async validation before attempting to save.
   * This function is called before a final form validation check is made.
   * Async validation observables are responsible to update the form's validity
   * via manual validators.
   *
   * When not overridden, it functions as a NOOP.
   */
  protected validateAsync(): Observable<any> {
    return of(undefined);
  }

  /**
   * Allows a partial update to the form group.
   * @see https://angular.io/guide/reactive-forms#patching-the-model-value
   */
  public patch(formModel: Patchable<TFormModel>) {
    this.formGroup.patchValue(formModel);
  }

  /**
   * Allows a full update to the form group.
   * @see https://angular.io/guide/reactive-forms#replacing-a-form-control-value
   */
  public set(formModel: TFormModel) {
    this.formGroup.setValue(formModel);
  }

  /**
   * Unsubscribes from all form subscriptions that were collected since initialization
   * and clears subscription list.
   *
   * Can be overridden to clean up additional resources.
   */
  public dispose() {
    this.formSubscriptions.forEach((s) => s.unsubscribe());
    this.formSubscriptions = [];
  }
}
