import { ValidationErrorMessage } from './validation-error-message.type';

export interface ValidationMetadata {
  errorMessage: ValidationErrorMessage;
  order: number;
}
