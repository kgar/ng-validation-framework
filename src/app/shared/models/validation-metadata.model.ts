export interface ValidationMetadata {
  errorMessage: ((error: any) => string) | string;
  order: number;
}
