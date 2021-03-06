import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { AppValidators } from '../shared/validation/services/app-validators.service';
import { Observable, of } from 'rxjs';
import { ShowRunInfoValidators } from '../shared/components/show-run-info/show-run-info-validators.model';
import { KingOfTheHillManualValidator } from './koth-manual.validator';
import { KingOfTheHillValidationService } from './services/king-of-the-hill-validation.service';
import { tap } from 'rxjs/operators';
import { MappedFormBuilder } from '../shared/validation/services/mapped-form-builder.service';
import { ShowRunInfoForm } from '../shared/components/show-run-info/show-run-info-form.model';
import { ManualValidationHelpers } from '../shared/validation/services/manual-validation-helpers.service';
import { FormServiceBase } from '../shared/validation/services/form-service-base.service';

@Injectable()
export class SandboxFormService extends FormServiceBase<SandboxForm> {
  public customFormValidators = [this.kingOfTheHillValidator.validatorConfig];

  constructor(
    private fb: MappedFormBuilder,
    private kingOfTheHillValidator: KingOfTheHillManualValidator,
    private kingOfTheHillValidationService: KingOfTheHillValidationService,
  ) {
    super();
  }

  public init() {
    this.formGroup = this.fb.group<SandboxForm>(
      {
        name: [
          '',
          [
            AppValidators.required.fn,
            AppValidators.minlength.createFn(2),
            this.kingOfTheHillValidator.validatorConfig.fn,
          ],
        ],
        animationType: [
          '',
          [AppValidators.required.fn, this.kingOfTheHillValidator.validatorConfig.fn],
        ],
        description: [
          'Description here.',
          [
            AppValidators.maxlength.createFn(this.descriptionMaxLength),
            AppValidators.minlength.createFn(this.descriptionMinLength),
          ],
        ],
        currentShowRunInfo: this.fb.group<ShowRunInfoForm>({
          firstAirDate: [null, AppValidators.required.fn],
          totalSeasonsToDate: [0, ShowRunInfoValidators.totalSeasonsToDateValidators],
        }),
        nextShowRunInfo: this.fb.group<ShowRunInfoForm>({
          firstAirDate: [new Date()],
          totalSeasonsToDate: [
            null,
            [...ShowRunInfoValidators.totalSeasonsToDateValidators, AppValidators.required.fn],
          ],
        }),
        imaginaryShowRunInfo: this.fb.group<ShowRunInfoForm>({
          firstAirDate: [new Date('1/30/2048')],
          totalSeasonsToDate: [0],
        }),
        alphanumericCharacters: ['', [AppValidators.alphanumeric.fn]],
      },
      { validators: [this.kingOfTheHillValidator.validatorConfig.fn] },
    );

    const subscription = ManualValidationHelpers.linkManuallyValidatedGroup(this.formGroup, [
      this.formGroup.get('name'),
      this.formGroup.get('animationType'),
    ]);

    this.formSubscriptions.push(subscription);
  }

  protected validateAsync(): Observable<any> {
    return this.kingOfTheHillValidationService
      .validate(this.formGroup.get('name').value, this.formGroup.get('animationType').value)
      .pipe(
        tap(isValid => {
          ManualValidationHelpers.triggerOneTimeValidationCheck(
            isValid,
            valid => (this.kingOfTheHillValidator.isValid = valid),
            this.formGroup,
          );
        }),
      );
  }

  protected save() {
    // simulated save event
    return of(true).pipe(tap(() => console.log('Successfully saved!')));
  }

  public get descriptionMinLength() {
    return 50;
  }

  public get descriptionMaxLength() {
    return 300;
  }

  public get currentShowRunInfo(): FormGroup {
    return this.formGroup.get('currentShowRunInfo') as FormGroup;
  }

  public get nextShowRunInfo(): FormGroup {
    return this.formGroup.get('nextShowRunInfo') as FormGroup;
  }

  public get imaginaryShowRunInfo(): FormGroup {
    return this.formGroup.get('imaginaryShowRunInfo') as FormGroup;
  }

  dispose(): void {
    this.formSubscriptions.forEach(s$ => s$.unsubscribe());
  }
}
