import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { AppValidators } from '../shared/validation/app-validators.service';

@Injectable()
export class SandboxFormService {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      name: ['', [AppValidators.required.fn, AppValidators.minlength.fn(2)]],
      animationType: ['', Validators.required],
      description: [
        'Description here.',
        [
          Validators.maxLength(this.descriptionMaxLength),
          Validators.minLength(this.descriptionMinLength),
        ],
      ],
      firstAirDate: [null],
      totalSeasonsToDate: [0, [Validators.min(1), Validators.max(9000)]],
      unspecialCharacters: [''],
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
