import { ValidatorFn, AsyncValidator, Validator } from '@angular/forms';
import { ValidationErrorMessage } from './validation-error-message.type';

export interface AppValidator {
  name: string;
  fn: ValidatorFn | Validator | AsyncValidator;
  errorMessage: ValidationErrorMessage;
  priority: number;
}
