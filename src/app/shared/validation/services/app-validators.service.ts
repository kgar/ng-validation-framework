import { ValidatorPriority } from '../models/validator-priority.enum';
import { Validators } from '@angular/forms';
import { AppValidatorConfig } from '../models/app-validator-config.model';
import { AppValidatorFactoryConfig } from '../models/app-validator-factory-config.model';
import { InvalidTextValidatorFactory } from '../custom-validators/invalid-text.validator';
import { AlphanumericValidator } from '../custom-validators/alphanumeric.validator';
import { ManualValidator, ManualValidatorArgs } from '../custom-validators/manual.validator';

export class AppValidators {

  static required: AppValidatorConfig = {
    name: 'required',
    errorMessage: 'This field is required',
    priority: ValidatorPriority.Highest,
    fn: Validators.required,
  };

  static minlength: AppValidatorFactoryConfig<number> = {
    name: 'minlength',
    errorMessage: error => `Minimum ${error.requiredLength} characters required`,
    priority: ValidatorPriority.Normal,
    createFn: Validators.minLength,
  };

  static maxlength: AppValidatorFactoryConfig<number> = {
    name: 'maxlength',
    errorMessage: error => `Maximum ${error.requiredLength} characters allowed`,
    priority: ValidatorPriority.Normal,
    createFn: Validators.maxLength,
  };

  static min: AppValidatorFactoryConfig<number> = {
    name: 'min',
    errorMessage: error => {
      return `Must be at least ${error.min}`;
    },
    priority: ValidatorPriority.Normal,
    createFn: Validators.min,
  };

  static max: AppValidatorFactoryConfig<number> = {
    name: 'max',
    errorMessage: error => {
      return `Must be no more than ${error.max}`;
    },
    priority: ValidatorPriority.Normal,
    createFn: Validators.max,
  };

  static alphanumeric: AppValidatorConfig = {
    name: 'alphanumeric',
    errorMessage: 'Alphanumeric characters only',
    priority: ValidatorPriority.Normal,
    fn: AlphanumericValidator,
  };

  static invalidText: AppValidatorFactoryConfig<string> = {
    name: 'invalidText',
    errorMessage: error => {
      return `Cannot contain the text ${error.value}`;
    },
    createFn: InvalidTextValidatorFactory,
    priority: ValidatorPriority.Normal,
  };

  static manual: AppValidatorFactoryConfig<ManualValidatorArgs> = {
    name: 'manual',
    errorMessage: '',
    createFn: ManualValidator,
    priority: ValidatorPriority.Lowest,
  };
}
