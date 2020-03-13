import { ValidationMetadata } from './models/validation-metadata.model';
import { ValidationErrorMessage } from './models/validation-error-message.type';
import { Injectable } from '@angular/core';
import { ValidationErrorSummary } from './models/validation-error-summary.model';
import { NgControl } from '@angular/forms';
import { ValidationStore } from './validation.store';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  constructor(private store: ValidationStore) {}

  private makeMetadata(key: string): ValidationErrorSummary {
    return this.store.get(key);
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
    return typeof errorMessage === 'function' ? errorMessage(errors[name]) : errorMessage;
  }
}
