import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';

@Injectable()
export class SandboxFormService {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
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
