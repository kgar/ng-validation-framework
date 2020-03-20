import { FormService } from '../models/form-service.model';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { concatMap, take, map } from 'rxjs/operators';

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
  abstract init(): void;

  /**
   * Performs reactive-forms-based submission steps for the most common use case.
   *
   * It is meant to be called by the consuming component on form submission.
   *
   * Handles all submission-related tasks, including
   * - a full synchronous validation check
   * - asynchronous validation check(s)
   * - saving the form
   *
   * The observable returns
   * - *true* when the save operation was successful
   * - *false* when validation fails
   * - an error when an error occurs during saving the form data
   */
  public submit(): Observable<boolean> {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (!this.formGroup.valid) {
      return of(false);
    }

    return this.buildAsyncValidatedSaveAttempt();
  }

  private buildAsyncValidatedSaveAttempt(): Observable<boolean> {
    return this.validateAsync().pipe(
      concatMap(() => {
        return this.formGroup.valid ? this.save().pipe(map(() => true)) : of(false);
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
   * Saves data to the server.
   */
  protected abstract save(): Observable<any>;

  /**
   * Allows a partial update to the form group.
   * @see https://angular.io/guide/reactive-forms#patching-the-model-value
   */
  public patch(formModel: TFormModel) {
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
   * Unsubscribes from all form subscriptions that were collected since initialization.
   *
   * Can be overridden to clean up additional resources.
   */
  public dispose() {
    this.formSubscriptions.forEach(s => s.unsubscribe());
  }
}
