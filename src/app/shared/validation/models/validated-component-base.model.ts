import { Input } from '@angular/core';
import { CustomValidationErrorMessages } from './custom-validation-error-messages.model';
import { AbstractControlDirective, AbstractFormGroupDirective } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { AppValidator } from './app-validator.model';

export class ValidatedComponentBase {
  /* A collection of message overrides for globally available application validators */
  @Input() customValidationMessages: CustomValidationErrorMessages = {};
  /* A collection of custom validators specific to the component */
  @Input() customValidators: AppValidator[];
  @Input() useValidationMessages = true;

  constructor(protected vs: ValidationService) {}

  protected getHighestPriorityErrorMessage(
    directive: AbstractFormGroupDirective | AbstractControlDirective,
  ) {
    const errors = directive?.errors;
    if (!errors) {
      return '';
    }

    const topError = this.vs.getHighestPriorityValidator(directive.errors, this.customValidators);
    const customErrorMessage = this.customValidationMessages[topError.name];
    const errorMessage =
      customErrorMessage !== undefined
        ? this.vs.extractErrorMessage(topError.name, customErrorMessage, directive.errors)
        : this.vs.extractErrorMessage(topError.name, topError.errorMessage, directive.errors);
    return errorMessage;
  }

  protected shouldShowError(directive: AbstractFormGroupDirective | AbstractControlDirective) {
    return this.vs.showError(directive);
  }
}
