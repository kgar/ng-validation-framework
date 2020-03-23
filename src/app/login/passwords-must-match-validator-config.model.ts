import { AppValidatorConfig } from '../shared/validation/models/app-validator-config.model';
import { FormGroup } from '@angular/forms';
import { ValidatorPriority } from '../shared/validation/models/validator-priority.enum';

export const PasswordsMustMatchValidatorConfig: AppValidatorConfig = {
  name: 'passwordsMustMatch',
  errorMessage: 'The passwords must match',
  fn: (control: FormGroup): { [key: string]: any } | null => {
    if (control.get('password').untouched || control.get('confirmPassword').untouched) {
      return null;
    }

    const passwordsMatch = control.get('password').value === control.get('confirmPassword').value;
    return !passwordsMatch ? { passwordsMustMatch: true } : null;
  },
  priority: ValidatorPriority.Normal,
};
