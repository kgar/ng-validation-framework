import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { AppValidators } from '../shared/validation/services/app-validators.service';
import { Subscription, Observable, of } from 'rxjs';
import { FormService } from '../shared/validation/models/form-service.model';
import { ShowRunInfoValidators } from '../shared/components/show-run-info/show-run-info-validators.model';
import { KingOfTheHillManualValidator } from './koth-manual.validator';
import { KingOfTheHillValidationService } from './services/king-of-the-hill-validation.service';
import { tap, concatMap } from 'rxjs/operators';
import { MappedFormBuilder } from '../shared/validation/services/mapped-form-builder.service';
import { ShowRunInfoForm } from '../shared/components/show-run-info/show-run-info-form.model';
import { ManualValidationHelpers } from '../shared/validation/services/validation-helpers.service';

@Injectable()
export class SandboxFormService implements FormService {
  private formSubscriptions: Subscription[] = [];
  public formGroup: FormGroup;
  public customFormValidators = [this.kingOfTheHillValidator.validator];

  constructor(
    private fb: MappedFormBuilder,
    private kingOfTheHillValidator: KingOfTheHillManualValidator,
    private kingOfTheHillValidationService: KingOfTheHillValidationService,
  ) {}

  public init() {
    this.formGroup = this.fb.group<SandboxForm>(
      {
        name: [
          '',
          [
            AppValidators.required.fn,
            AppValidators.minlength.fn(2),
            this.kingOfTheHillValidator.validator.fn,
          ],
        ],
        animationType: ['', [AppValidators.required.fn, this.kingOfTheHillValidator.validator.fn]],
        description: [
          'Description here.',
          [
            AppValidators.maxlength.fn(this.descriptionMaxLength),
            AppValidators.minlength.fn(this.descriptionMinLength),
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
      { validators: [this.kingOfTheHillValidator.validator.fn] },
    );

    const subscription = ManualValidationHelpers.linkManuallyValidatedGroup(this.formGroup, [
      this.formGroup.get('name'),
      this.formGroup.get('animationType'),
    ]);

    this.formSubscriptions.push(subscription);
  }

  // TODO: Figure out how to take away the boilerplate for this
  public submit(): Observable<boolean> {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();

    if (!this.formGroup.valid) {
      return of(false);
    }

    // TODO: Determine if this can somehow be extracted into a service
    const asyncValidation$ = this.kingOfTheHillValidationService
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

    const submission$ = asyncValidation$.pipe(
      concatMap(result => {
        console.log('concat map called', 'result: ', result);
        console.log('form group validity', this.formGroup.valid);
        return this.formGroup.valid ? this.save() : of(false);
      }),
    );

    return submission$;
  }

  private save() {
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

  public getForm(): SandboxForm {
    return this.formGroup.value;
  }

  public set(model: SandboxForm) {
    this.formGroup.setValue(model);
  }

  public patch(model: SandboxForm) {
    this.formGroup.patchValue(model);
  }

  dispose(): void {
    this.formSubscriptions.forEach(s$ => s$.unsubscribe());
  }
}
