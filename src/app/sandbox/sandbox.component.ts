import { Component, OnInit } from '@angular/core';
import { faInfoCircle, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { SandboxFormService } from './sandbox-form.service';
import { CustomValidationErrorMessages } from '../shared/validation/models/custom-validation-error-messages.model';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  faInfoCircle = faInfoCircle;
  faPizzaSlice = faPizzaSlice;

  get formGroup() {
    return this.formService?.formGroup;
  }

  seasonErrorMessages: CustomValidationErrorMessages = {
    min: error => `Must be at least ${error.min} season(s)`,
    max: error => `Must be no more than ${error.max} seasons`,
  };

  constructor(public formService: SandboxFormService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.formService.formGroup.markAllAsTouched();

    if (!this.formService.formGroup.valid) {
      return;
    }

    alert('You did it!');
  }

  deselectAnimationType() {
    this.formService.patch({ animationType: '' });
  }

  setFirstAirDateToToday() {
    this.formService.patch({ firstAirDate: new Date() });
  }
}
