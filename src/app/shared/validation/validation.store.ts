import { ValidationErrorSummary } from './models/validation-error-summary.model';
import { Injectable } from '@angular/core';
import { ValidationMetadata } from './models/validation-metadata.model';

@Injectable({ providedIn: 'root' })
export class ValidationStore {
  validationMetadataMap = new Map<string, ValidationMetadata>();

  constructor() {
    // TODO: Determine where to put validation summaries for custom validators
    // TODO: Determine where to put these validation summaries for built-in validators
    this.validationMetadataMap.set('required', { errorMessage: 'This field is required', order: 1 });
    this.validationMetadataMap.set('minlength', {
      errorMessage: error => `Minimum ${error.requiredLength} characters required`,
      order: 2,
    });
    this.validationMetadataMap.set('maxlength', {
      errorMessage: error => `Maximum ${error.requiredLength} characters allowed`,
      order: 3,
    });
    this.validationMetadataMap.set('min', {
      errorMessage: error => {
        return `Must be at least ${error.min}`;
      },
      order: 4,
    });
    this.validationMetadataMap.set('max', {
      errorMessage: error => {
        return `Must be less than ${error.max}`;
      },
      order: 5,
    });
  }

  register(m: ValidationErrorSummary) {
    this.validationMetadataMap.set(m.name, { order: m.order, errorMessage: m.errorMessage });
  }

  get(name: string): ValidationErrorSummary {
    return {
      name,
      ...this.validationMetadataMap.get(name),
    };
  }
}
