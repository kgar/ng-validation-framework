import { Input, Directive } from '@angular/core';
import { CustomValidationErrorMessages } from './custom-validation-error-messages.model';
import {
  AbstractControlDirective,
  AbstractFormGroupDirective,
  AbstractControl,
} from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import { AppValidatorConfig } from './app-validator-config.model';

@Directive()
export class ValidatedComponentBase {
  /**
   * A collection of message overrides for globally available application validators
   */
  @Input() customValidationMessages: CustomValidationErrorMessages = {};
  /**
   * A collection of custom validators specific to the component
   */
  @Input() customValidators: AppValidatorConfig[];
  @Input() useDefaultMessagePlacement = true;

  constructor(protected vs: ValidationService) {}

  protected getHighestPriorityErrorMessage(
    directive: AbstractFormGroupDirective | AbstractControlDirective | AbstractControl,
    filteredErrorTypes?: string[],
  ) {
    const errors = directive?.errors;
    if (!errors) {
      return '';
    }

    const applyFilterToErrorTypes =
      filteredErrorTypes !== undefined && filteredErrorTypes.length > 0;
    const errorsToCheck = applyFilterToErrorTypes
      ? Object.keys(directive.errors).filter((e) => filteredErrorTypes.indexOf(e) >= 0)
      : Object.keys(directive.errors);

    const topError = this.vs.getHighestPriorityValidator(errorsToCheck, this.customValidators);

    if (!topError) {
      return '';
    }

    const customErrorMessage = this.customValidationMessages[topError.name];
    const errorMessage =
      customErrorMessage !== undefined
        ? this.vs.extractErrorMessage(topError.name, customErrorMessage, directive.errors)
        : this.vs.extractErrorMessage(topError.name, topError.errorMessage, directive.errors);
    return errorMessage;
  }

  protected shouldShowError(
    directive: AbstractFormGroupDirective | AbstractControlDirective | AbstractControl,
  ) {
    return this.vs.showError(directive);
  }
}
