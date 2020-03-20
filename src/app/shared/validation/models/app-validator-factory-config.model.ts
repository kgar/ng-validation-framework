import { ValidatorFn } from '@angular/forms';
import { ValidationErrorMessage } from './validation-error-message.type';

export interface AppValidatorFactoryConfig<T> {
  name: string;
  createFn: (args: T) => ValidatorFn;
  errorMessage: ValidationErrorMessage;
  priority: number;
}
