import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { AppValidators } from '../shared/validation/app-validators.service';
import { Subscription, Observable, of } from 'rxjs';
import { FormService } from '../shared/validation/models/form-service.model';
import { ShowRunInfoValidators } from '../shared/components/show-run-info/show-run-info-validators.model';
import { KingOfTheHillManualValidator } from './koth-manual.validator';

@Injectable()
export class SandboxFormService implements FormService {
  private formSubscriptions$: Subscription;
  public formGroup: FormGroup;
  public customFormValidators = [this.kingOfTheHillValidator.validator];

  constructor(
    private fb: FormBuilder,
    private kingOfTheHillValidator: KingOfTheHillManualValidator,
  ) {}

  public init() {
    this.formGroup = this.fb.group(
      {
        name: [
          '',
          [
            AppValidators.required.fn,
            AppValidators.minlength.fn(2),
            this.kingOfTheHillValidator.controlsValidatorFn,
          ],
        ],
        animationType: [
          '',
          [AppValidators.required.fn, this.kingOfTheHillValidator.controlsValidatorFn],
        ],
        description: [
          'Description here.',
          [
            AppValidators.maxlength.fn(this.descriptionMaxLength),
            AppValidators.minlength.fn(this.descriptionMinLength),
          ],
        ],
        currentShowRunInfo: this.fb.group({
          firstAirDate: [null, AppValidators.required.fn],
          totalSeasonsToDate: [0, ShowRunInfoValidators.totalSeasonsToDateValidators],
        }),
        nextShowRunInfo: this.fb.group({
          firstAirDate: [new Date()],
          totalSeasonsToDate: [
            null,
            [...ShowRunInfoValidators.totalSeasonsToDateValidators, AppValidators.required.fn],
          ],
        }),
        imaginaryShowRunInfo: this.fb.group({
          firstAirDate: [new Date('1/30/2048')],
          totalSeasonsToDate: [0],
        }),
        alphanumericCharacters: ['', [AppValidators.alphanumeric.fn]],
      },
      { validators: [this.kingOfTheHillValidator.validator.fn] },
    );

    this.formSubscriptions$ = this.formGroup.statusChanges.subscribe(() => {
      this.kingOfTheHillValidator.isValid = !this.formGroup.errors?.kingOfTheHillAnime;
      // TODO: Comment these lines temporarily to see if it'll just work
      // TODO: Uncomment these lines if not working
      this.formGroup.get('name').updateValueAndValidity({ onlySelf: true });
      this.formGroup.get('animationType').updateValueAndValidity({ onlySelf: true });
    });
  }

  // TODO: Figure out how to take away the boilerplate for this
  public submit(): Observable<boolean> {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      return of(true);
    }

    // Check async validation

    // Somehow return this after forms have been checked
    return of(this.formGroup.valid);
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
    this.formSubscriptions$?.unsubscribe();
  }
}
