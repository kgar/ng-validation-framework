import { ValidationErrorMessage } from './models/validation-error-message.type';
import { Injectable } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AppValidators } from './app-validators.service';
import { AppValidator } from './models/app-validator.model';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  public getHighestPriorityError(errors: object): AppValidator {
    if (!errors) {
      return undefined;
    }

    const keys = Object.keys(errors);

    let highestPriorityError: AppValidator;
    keys.forEach(key => {
      const currentSummary = AppValidators[key];

      if (currentSummary === undefined) {
        console.error(
          'This validation error was not included in the application validators. No custom message can be found.',
          key,
        );
        return;
      }

      if (highestPriorityError === undefined) {
        highestPriorityError = currentSummary;
        return;
      }

      highestPriorityError = [currentSummary, highestPriorityError].reduce(
        entry => (entry.priority > highestPriorityError.priority ? entry : highestPriorityError),
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
