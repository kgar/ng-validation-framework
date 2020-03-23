import { FormServiceBase } from '../shared/validation/services/form-service-base.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppValidators } from '../shared/validation/services/app-validators.service';
import { MappedFormBuilder } from '../shared/validation/services/mapped-form-builder.service';
import { LoginForm } from './login-form.model';
import { PasswordsMustMatchValidatorConfig } from './passwords-must-match-validator-config.model';
import { ManualValidationHelpers } from '../shared/validation/services/manual-validation-helpers.service';

@Injectable({
  providedIn: 'any',
})
export class LoginFormService extends FormServiceBase<LoginForm> {
  public customFormGroupValidators = [PasswordsMustMatchValidatorConfig];

  constructor(private fb: MappedFormBuilder) {
    super();
  }

  init(): void {
    const passwordsMustMatchControlValidator = AppValidators.manual.createFn({
      isValidCallback: () => !this.formGroup?.errors?.passwordsMustMatch,
      validationErrorKey: PasswordsMustMatchValidatorConfig.name,
    });

    this.formGroup = this.fb.group<LoginForm>(
      {
        username: [
          '',
          [
            AppValidators.required.fn,
            AppValidators.minlength.createFn(10),
            AppValidators.maxlength.createFn(256),
          ],
        ],
        password: ['', [AppValidators.required.fn, passwordsMustMatchControlValidator]],
        confirmPassword: ['', [passwordsMustMatchControlValidator]],
      },
      { validators: [PasswordsMustMatchValidatorConfig.fn] },
    );

    const subscription = ManualValidationHelpers.linkManuallyValidatedGroup(this.formGroup, [
      this.formGroup.get('password'),
      this.formGroup.get('confirmPassword'),
    ]);

    this.formSubscriptions.push(subscription);
  }

  protected save(): Observable<any> {
    return of(undefined);
  }
}
