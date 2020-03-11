import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';

// TODO: To singleton service with multi->true, tokenized approach.
const validationErrorMessageMap = new Map<string, (error) => string>();
// TODO: Set up using tokenized approach
validationErrorMessageMap.set('required', () => 'This field is required.');
// TODO: Set up using tokenized approach
validationErrorMessageMap.set(
  'minlength',
  error => `Minimum ${error.requiredLength} characters required.`,
);

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  sandboxFormGroup: FormGroup;
  get nameControl() {
    return this.sandboxFormGroup.get('name');
  }
  get nameControlErrorMessage() {
    const topErrorType = Object.keys(this.nameControl.errors)[0];
    return validationErrorMessageMap.get(topErrorType)(this.nameControl.errors[topErrorType]);
  }
  get nameControlShowError() {
    return this.nameControl.invalid && this.nameControl.touched;
  }

  constructor() {}

  ngOnInit(): void {
    const fb = new FormBuilder();

    this.sandboxFormGroup = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    console.log('submit attempted')
    this.sandboxFormGroup.markAllAsTouched();

    if (!this.sandboxFormGroup.valid) {
      return;
    }

    alert('You did it!');
  }
}
