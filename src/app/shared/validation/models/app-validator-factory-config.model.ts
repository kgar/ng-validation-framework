import { ValidatorFn } from '@angular/forms';
import { ValidationErrorMessage } from './validation-error-message.type';

/**
 * Configuration for validation that allows inputs for dynamically generating
 * a configured validator function.
 */
export interface AppValidatorFactoryConfig<T> {
  name: string;
  createFn: (args: T) => ValidatorFn;
  errorMessage: ValidationErrorMessage;
  priority: number;
}
