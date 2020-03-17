export interface ManualValidatorArgs {
  isValidCallback: () => boolean;
  validationErrorKey: string;
}

// Utility validator used to programmatically decorate inputs as invalid
export function ManualValidator({isValidCallback, validationErrorKey = 'manual'}: ManualValidatorArgs) {
  return () => {
    return isValidCallback() ? null : { [validationErrorKey]: true };
  };
}
