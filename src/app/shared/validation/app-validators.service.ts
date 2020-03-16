import { ValidatorPriority } from './models/validator-priority.enum';
import { Validators, FormControlName, FormControl } from '@angular/forms';
import { AppValidator } from './models/app-validator.model';
import { AppConfigurableValidator } from './models/AppConfigurableValidator';
import { InvalidTextValidator } from './custom-validators/invalid-text.validator';
import { TextMustMatchValidator } from './custom-validators/text-must-match.validator';
import { TextMustMatchArgs } from './custom-validators/text-must-match-args.model';

export class AppValidators {
  static required: AppValidator = {
    name: 'required',
    errorMessage: 'This field is required',
    priority: ValidatorPriority.Highest,
    fn: Validators.required,
  };

  static alphanumeric: AppValidator = {
    name: 'alphanumeric',
    errorMessage: 'Alphanumeric characters only',
    priority: ValidatorPriority.Normal,
    fn: Validators.pattern(/\w/),
  };

  static minlength: AppConfigurableValidator<number> = {
    name: 'minlength',
    errorMessage: error => `Minimum ${error.requiredLength} characters required`,
    priority: ValidatorPriority.Normal,
    fn: Validators.minLength,
  };

  static maxlength: AppConfigurableValidator<number> = {
    name: 'maxlength',
    errorMessage: error => `Maximum ${error.requiredLength} characters allowed`,
    priority: ValidatorPriority.Normal,
    fn: Validators.maxLength,
  };

  static min: AppConfigurableValidator<number> = {
    name: 'min',
    errorMessage: error => {
      return `Must be at least ${error.min}`;
    },
    priority: ValidatorPriority.Normal,
    fn: Validators.maxLength,
  };

  static max: AppConfigurableValidator<number> = {
    name: 'max',
    errorMessage: error => {
      return `Must be no more than ${error.max}`;
    },
    priority: ValidatorPriority.Normal,
    fn: Validators.maxLength,
  };

  static invalidText: AppConfigurableValidator<string> = {
    name: 'invalidText',
    errorMessage: error => {
      return `Cannot contain the text ${error.value}`;
    },
    fn: InvalidTextValidator,
    priority: ValidatorPriority.Normal,
  };

  static textMustMatch: AppConfigurableValidator<TextMustMatchArgs> = {
    name: 'textMustMatch',
    errorMessage: error => {
      return `Text must match with ${error.value}`;
    },
    fn: TextMustMatchValidator,
    priority: ValidatorPriority.Normal,
  };
}
