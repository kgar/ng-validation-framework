import { ValidationErrorMessage } from '../models/validation-error-message.type';
import { Injectable } from '@angular/core';
import {
  AbstractFormGroupDirective,
  AbstractControlDirective,
  AbstractControl,
} from '@angular/forms';
import { AppValidators } from './app-validators.service';
import { AppValidatorConfig } from '../models/app-validator-config.model';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private validatorKeysLookup: {};

  public getHighestPriorityValidator(
    errors: string[],
    customValidators?: AppValidatorConfig[],
  ): AppValidatorConfig {
    if (!errors || errors.length === 0) {
      return undefined;
    }

    let highestPriorityError: AppValidatorConfig;
    errors.forEach((errorType) => {
      const currentSummary = this.getValidator(errorType, customValidators);

      if (currentSummary === undefined) {
        return;
      }

      if (highestPriorityError === undefined) {
        highestPriorityError = currentSummary;
        return;
      }

      highestPriorityError =
        currentSummary.priority > highestPriorityError.priority
          ? currentSummary
          : highestPriorityError;
    });

    return highestPriorityError;
  }

  public showError(
    directive: AbstractFormGroupDirective | AbstractControlDirective | AbstractControl,
  ) {
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

  private getValidator(key: string, customValidators?: AppValidatorConfig[]): AppValidatorConfig {
    this.validatorKeysLookup = this.validatorKeysLookup || this.createNormalizeKeyLookup();
    return (
      AppValidators[this.validatorKeysLookup[key.toLowerCase()]] ||
      customValidators?.find((v) => v.name.toLocaleLowerCase() === key.toLocaleLowerCase())
    );
  }
}
