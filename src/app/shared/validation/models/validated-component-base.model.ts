import { Input, ContentChild } from '@angular/core';
import { CustomValidationErrorMessages } from './custom-validation-error-messages.model';
import { NgControl } from '@angular/forms';
import { ValidationService } from '../validation.service';

export class ValidatedComponentBase {
  @Input() customValidationMessages: CustomValidationErrorMessages = {};
  @ContentChild(NgControl) control: NgControl;
  @Input() useValidationMessages = true;

  constructor(protected vs: ValidationService) {}

  public get errorMessage() {
    const errors = this.control?.errors;
    if (!errors) {
      return '';
    }

    const topError = this.vs.getHighestPriorityError(this.control.errors);
    const customErrorMessage = this.customValidationMessages[topError.name];
    const errorMessage =
      customErrorMessage !== undefined
        ? this.vs.extractErrorMessage(topError.name, customErrorMessage, this.control.errors)
        : this.vs.extractErrorMessage(topError.name, topError.errorMessage, this.control.errors);
    return errorMessage;
  }

  public get showError() {
    return this.vs.showError(this.control);
  }
}
