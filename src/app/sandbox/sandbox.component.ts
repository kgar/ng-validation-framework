import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface ValidationMetadata {
  errorMessage: ((error: any) => string) | string;
  order: number;
}

/*
  Interesting... Custom messages and order of error appearance are not a thing by default.
  How do I make this a thing for my setup in a way that is extensible and easy to understand...?
*/

const validationMetadataMap = new Map<string, ValidationMetadata>();
validationMetadataMap.set('required', { errorMessage: 'This field is required.', order: 1 });
validationMetadataMap.set('minlength', {
  errorMessage: error => `Minimum ${error.requiredLength} characters required.`,
  order: 2,
});

interface KeyOrder {
  key: string;
  order: number;
}

function makeKeyOrder(key: string): KeyOrder {
  return { key, order: validationMetadataMap.get(key).order };
}

function getHighestPriorityError(errors: object) {
  if (!errors) {
    return undefined;
  }

  const keys = Object.keys(errors);

  let highestPriorityError: KeyOrder;
  keys.forEach(key => {
    const currentKeyOrder = makeKeyOrder(key);

    if (highestPriorityError === undefined) {
      highestPriorityError = currentKeyOrder;
      return;
    }

    highestPriorityError = [currentKeyOrder, highestPriorityError].reduce(
      entry => (entry.order < highestPriorityError.order ? entry : highestPriorityError),
      highestPriorityError,
    );
  });

  return highestPriorityError.key;
}

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  sandboxFormGroup: FormGroup;
  faInfoCircle = faInfoCircle;
  get nameControl() {
    return this.sandboxFormGroup.get('name');
  }
  get nameControlErrorMessage() {
    const errors = this.nameControl.errors;
    if (!errors) {
      return '';
    }
    const topErrorType = getHighestPriorityError(this.nameControl.errors);
    const errorMessageProp = validationMetadataMap.get(topErrorType).errorMessage;
    const errorMessage =
      typeof errorMessageProp === 'function'
        ? errorMessageProp(this.nameControl.errors[topErrorType])
        : errorMessageProp;
    return errorMessage;
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
    this.sandboxFormGroup.markAllAsTouched();

    if (!this.sandboxFormGroup.valid) {
      return;
    }

    alert('You did it!');
  }
}
