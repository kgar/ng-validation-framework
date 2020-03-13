import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { SandboxFormService } from './sandbox-form.service';
import {
  CustomValidationErrorMessages,
} from '../shared/models/validation-metadata.model';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  faInfoCircle = faInfoCircle;

  get formGroup() {
    return this.formService?.formGroup;
  }

  seasonErrorMessages: CustomValidationErrorMessages = {
    min: error => `Must be at least ${error.min} season(s)`,
    max: error => `Must be less than ${error.max} seasons`,
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
