import { Input } from '@angular/core';
import { CustomValidationErrorMessages } from './custom-validation-error-messages.model';
import { AbstractControlDirective, AbstractFormGroupDirective } from '@angular/forms';
import { ValidationService } from '../validation.service';

export class ValidatedComponentBase {
  @Input() customValidationMessages: CustomValidationErrorMessages = {};
  @Input() useValidationMessages = true;

  constructor(protected vs: ValidationService) {}

  protected getHighestPriorityErrorMessage(directive: AbstractFormGroupDirective | AbstractControlDirective) {
    const errors = directive?.errors;
    if (!errors) {
      return '';
    }

    const topError = this.vs.getHighestPriorityError(directive.errors);
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
