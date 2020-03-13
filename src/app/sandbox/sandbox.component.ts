import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from '../shared/services/validation-metadata.service';
import { SandboxForm } from './sandbox-form.model';
import { SandboxFormService } from './sandbox-form.service';

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
