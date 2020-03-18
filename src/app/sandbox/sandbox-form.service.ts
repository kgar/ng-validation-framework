import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { AppValidators } from '../shared/validation/app-validators.service';
import { KingOfTheHillAnimeValidatorFn } from './koth-anime.validator';
import { Subscription } from 'rxjs';
import { FormService } from '../shared/validation/models/form-service.model';

@Injectable()
export class SandboxFormService implements FormService {
  formGroup: FormGroup;

  kingOfTheHillValidator = KingOfTheHillAnimeValidatorFn;
  kingOfTheHillIsValid = true;
  kingOfTheHillControlsManualValidator = AppValidators.manual.fn({
    isValidCallback: () => this.kingOfTheHillIsValid,
    validationErrorKey: 'kingOfTheHillIsAnime',
  });

  formSubscriptions$: Subscription;

  constructor(private fb: FormBuilder) {}

  public init() {
    console.log('initializing sandbox form');

    this.formGroup = this.fb.group(
      {
        name: [
          '',
          [
            AppValidators.required.fn,
            AppValidators.minlength.fn(2),
            this.kingOfTheHillControlsManualValidator,
          ],
        ],
        animationType: ['', [AppValidators.required.fn, this.kingOfTheHillControlsManualValidator]],
        description: [
          'Description here.',
          [
            AppValidators.maxlength.fn(this.descriptionMaxLength),
            AppValidators.minlength.fn(this.descriptionMinLength),
          ],
        ],
        firstAirDate: [null],
        totalSeasonsToDate: [0, [AppValidators.min.fn(1), AppValidators.max.fn(9000)]],
        alphanumericCharacters: ['', [AppValidators.alphanumeric.fn]],
      },
      { validators: [this.kingOfTheHillValidator] },
    );

    this.formSubscriptions$ = this.formGroup.statusChanges.subscribe(() => {
      this.kingOfTheHillIsValid = !this.formGroup.errors?.kingOfTheHillAnime;
      this.formGroup.get('name').updateValueAndValidity({ onlySelf: true });
      this.formGroup.get('animationType').updateValueAndValidity({ onlySelf: true });
    });
  }

  public get descriptionMinLength() {
    return 50;
  }

  public get descriptionMaxLength() {
    return 300;
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
