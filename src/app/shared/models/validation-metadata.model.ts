export type ValidationErrorMessage = ((error: any) => string) | string;

export interface CustomValidationErrorMessages {
  [key: string]: ValidationErrorMessage;
}

export interface ValidationMetadata {
  errorMessage: ValidationErrorMessage;
  order: number;
}
