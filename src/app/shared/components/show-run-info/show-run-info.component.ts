import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomValidationErrorMessages } from '../../validation/models/custom-validation-error-messages.model';
import { ShowRunInfoForm } from './show-run-info-form.model';

@Component({
  selector: 'app-show-run-info',
  templateUrl: './show-run-info.component.html',
  styleUrls: ['./show-run-info.component.scss']
})
export class ShowRunInfoComponent implements OnInit {
  @Input() parentForm: FormGroup;
  seasonErrorMessages: CustomValidationErrorMessages = {
    min: error => `Must be at least ${error.min} season(s)`,
    max: error => `Must be no more than ${error.max} seasons`,
  };

  constructor() { }

  ngOnInit(): void {
  }

  setFirstAirDateToToday() {
    const modelPatch: ShowRunInfoForm = { firstAirDate: new Date() };
    this.parentForm.patchValue(modelPatch);
  }
}
