import { ValidatorFn } from '@angular/forms';
import { ValidationErrorMessage } from './validation-error-message.type';

export interface AppConfigurableValidator<T> {
  name: string;
  fn: (args: T) => ValidatorFn;
  errorMessage: ValidationErrorMessage;
  priority: number;
}
