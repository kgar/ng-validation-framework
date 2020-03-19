import { FormService } from '../models/form-service.model';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { concatMap, take } from 'rxjs/operators';

export abstract class FormServiceBase implements FormService {
  protected formSubscriptions: Subscription[] = [];
  public formGroup: FormGroup;

  abstract init(): void;

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
        return this.formGroup.valid ? this.save() : of(false);
      }),
      take(1),
    );
  }

  protected validateAsync(): Observable<boolean> {
    return of(true);
  }

  protected abstract save(): Observable<boolean>;

  public dispose() {
    this.formSubscriptions.forEach(s => s.unsubscribe());
  }
}
