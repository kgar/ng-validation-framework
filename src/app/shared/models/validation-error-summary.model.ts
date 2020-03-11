import { ValidationMetadata } from './validation-metadata.model';

export interface ValidationErrorSummary extends ValidationMetadata {
  name: string;
}
