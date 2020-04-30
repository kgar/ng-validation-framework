import { ValidatorFn } from '@angular/forms';
import { ValidationErrorMessage } from './validation-error-message.type';

/**
 * Configuration for static validation.
 */
export interface AppValidatorConfig {
  name: string;
  fn: ValidatorFn;
  errorMessage: ValidationErrorMessage;
  priority: number;
}
