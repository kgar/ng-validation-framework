import { ValidationErrorMessage } from './models/validation-error-message.type';
import { Injectable } from '@angular/core';
import { AbstractFormGroupDirective, AbstractControlDirective } from '@angular/forms';
import { AppValidators } from './app-validators.service';
import { AppValidator } from './models/app-validator.model';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private validatorKeysLookup: {};

  public getHighestPriorityValidator(
    errors: object,
    customValidators?: AppValidator[],
  ): AppValidator {
    if (!errors) {
      return undefined;
    }

    const keys = Object.keys(errors);

    let highestPriorityError: AppValidator;
    keys.forEach(key => {
      const currentSummary = this.getValidator(key, customValidators);

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

  public showError(directive: AbstractFormGroupDirective | AbstractControlDirective) {
    return directive !== undefined ? directive.invalid && directive.touched : false;
  }

  public extractErrorMessage(name: string, errorMessage: ValidationErrorMessage, errors: object) {
    return typeof errorMessage === 'function' ? errorMessage(errors[name]) : errorMessage;
  }

  private createNormalizeKeyLookup() {
    return Object.keys(AppValidators).reduce((keys, k) => {
      keys[k.toLowerCase()] = k;
      return keys;
    }, {});
  }

  private getValidator(key: string, customValidators?: AppValidator[]): AppValidator {
    this.validatorKeysLookup = this.validatorKeysLookup || this.createNormalizeKeyLookup();
    return (
      AppValidators[this.validatorKeysLookup[key.toLowerCase()]] ||
      customValidators?.find(v => v.name.toLocaleLowerCase() === key.toLocaleLowerCase())
    );
  }
}
