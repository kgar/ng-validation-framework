import { ValidatorFn, AsyncValidator, Validator } from '@angular/forms';
import { ValidationErrorMessage } from './validation-error-message.type';

export interface AppValidatorConfig {
  name: string;
  fn: ValidatorFn;
  errorMessage: ValidationErrorMessage;
  priority: number;
}
