import { ValidationMetadata, ValidationErrorMessage } from '../models/validation-metadata.model';
import { Injectable } from '@angular/core';
import { ValidationErrorSummary } from '../models/validation-error-summary.model';
import { NgControl } from '@angular/forms';

/*
  How do I make this extensible and easy to understand...?
*/
const validationMetadataMap = new Map<string, ValidationMetadata>();
validationMetadataMap.set('required', { errorMessage: 'This field is required', order: 1 });
validationMetadataMap.set('minlength', {
  errorMessage: error => `Minimum ${error.requiredLength} characters required`,
  order: 2,
});
validationMetadataMap.set('maxlength', {
  errorMessage: error => `Maximum ${error.requiredLength} characters allowed`,
  order: 3,
});
validationMetadataMap.set('min', {
  errorMessage: error => {
    return `Must be at least ${error.min}`;
  },
  order: 4,
});
validationMetadataMap.set('max', {
  errorMessage: error => {
    return `Must be less than ${error.max}`;
  },
  order: 5,
});

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private makeMetadata(key: string): ValidationErrorSummary {
    return { name: key, ...validationMetadataMap.get(key) };
  }

  public getHighestPriorityError(errors: object): ValidationErrorSummary {
    if (!errors) {
      return undefined;
    }

    const keys = Object.keys(errors);

    let highestPriorityError: ValidationErrorSummary;
    keys.forEach(key => {
      const currentSummary = this.makeMetadata(key);

      if (highestPriorityError === undefined) {
        highestPriorityError = currentSummary;
        return;
      }

      highestPriorityError = [currentSummary, highestPriorityError].reduce(
        entry => (entry.order < highestPriorityError.order ? entry : highestPriorityError),
        highestPriorityError,
      );
    });

    return highestPriorityError;
  }

  public showError(control: NgControl) {
    return control !== undefined ? control.invalid && control.touched : false;
  }

  public extractErrorMessage(name: string, errorMessage: ValidationErrorMessage, errors: object) {
    return typeof errorMessage === 'function'
      ? errorMessage(errors[name])
      : errorMessage;
  }
}
