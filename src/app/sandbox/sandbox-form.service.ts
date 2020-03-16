import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { AppValidators } from '../shared/validation/app-validators.service';

@Injectable()
export class SandboxFormService {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      name: ['', [AppValidators.required.fn, AppValidators.minlength.fn(2)]],
      animationType: ['', AppValidators.required.fn],
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
