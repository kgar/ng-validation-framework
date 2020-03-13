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
      description: ['Description here.', [Validators.maxLength(300), Validators.minLength(50)]],
      firstAirDate: [null],
      totalSeasonsToDate: [0, [Validators.min(1), Validators.max(9000)]],
    });
  }

  set(model: SandboxForm) {
    this.formGroup.setValue(model);
  }

  patch(model: SandboxForm) {
    this.formGroup.patchValue(model);
  }
}
