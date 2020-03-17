import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { AppValidators } from '../shared/validation/app-validators.service';
import { KingOfTheHillAnimeValidatorFn } from './koth-anime.validator';

@Injectable()
export class SandboxFormService {
  formGroup: FormGroup;
  kingOfTheHillIsValid = true;

  constructor(fb: FormBuilder) {
    const kingOfTheHillValidator = KingOfTheHillAnimeValidatorFn(() => this.formGroup);

    const kingOfTheHillControlsValidator = AppValidators.manual.fn({
      isValidCallback: () => this.kingOfTheHillIsValid,
      validationErrorKey: 'test',
    });

    this.formGroup = fb.group(
      {
        name: [
          '',
          [
            AppValidators.required.fn,
            AppValidators.minlength.fn(2),
            kingOfTheHillControlsValidator,
          ],
        ],
        animationType: ['', [AppValidators.required.fn, kingOfTheHillControlsValidator]],
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
      { validators: [kingOfTheHillValidator] },
    );

    this.formGroup.statusChanges.subscribe(() => {
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
}
