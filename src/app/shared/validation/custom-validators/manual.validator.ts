export interface ManualValidatorArgs {
  isValidCallback: () => boolean;
  validationErrorKey: string;
}

/**
 * Utility validator for programmatically decorating inputs as invalid.
 *
 * Primarily used for
 * - group validation where only one error message should appear
 * - submission-time async validation where the form and affected controls need
 *   to be programmatically decorated as invalid after a server call.
 */
export function manualValidator({
  isValidCallback,
  validationErrorKey = 'manual',
}: ManualValidatorArgs) {
  return () => {
    return isValidCallback() ? null : { [validationErrorKey]: true };
  };
}
