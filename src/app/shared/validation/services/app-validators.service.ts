import { ValidatorPriority } from '../models/validator-priority.enum';
import { Validators } from '@angular/forms';
import { AppValidatorConfig } from '../models/app-validator-config.model';
import { AppValidatorFactoryConfig } from '../models/app-validator-factory-config.model';
import { invalidTextValidatorFactory } from '../custom-validators/invalid-text.validator';
import { alphanumericValidator } from '../custom-validators/alphanumeric.validator';
import { manualValidator, ManualValidatorArgs } from '../custom-validators/manual.validator';
import { fileNameCharactersOnlyValidator } from '../custom-validators/file-name-characters-only.validator';
import { numericValidator } from 'src/app/shared/validation/custom-validators/numeric.validator';
import { notEmptyListValidator } from 'src/app/shared/validation/custom-validators/not-empty-list.validator';

export class AppValidators {
  static required: AppValidatorConfig = {
    name: 'required',
    errorMessage: 'This field is required',
    priority: ValidatorPriority.Highest,
    fn: Validators.required,
  };

  static minlength: AppValidatorFactoryConfig<number> = {
    name: 'minlength',
    errorMessage: (error) => `Minimum ${error.requiredLength} characters required`,
    priority: ValidatorPriority.Normal,
    createFn: Validators.minLength,
  };

  static maxlength: AppValidatorFactoryConfig<number> = {
    name: 'maxlength',
    errorMessage: (error) => `Maximum ${error.requiredLength} characters allowed`,
    priority: ValidatorPriority.Normal,
    createFn: Validators.maxLength,
  };

  static min: AppValidatorFactoryConfig<number> = {
    name: 'min',
    errorMessage: (error) => {
      return `Must be at least ${error.min}`;
    },
    priority: ValidatorPriority.Normal,
    createFn: Validators.min,
  };

  static max: AppValidatorFactoryConfig<number> = {
    name: 'max',
    errorMessage: (error) => {
      return `Must be no more than ${error.max}`;
    },
    priority: ValidatorPriority.Normal,
    createFn: Validators.max,
  };

  static alphanumeric: AppValidatorConfig = {
    name: 'alphanumeric',
    errorMessage: 'Alphanumeric characters only',
    priority: ValidatorPriority.Normal,
    fn: alphanumericValidator,
  };

  static invalidText: AppValidatorFactoryConfig<string> = {
    name: 'invalidText',
    errorMessage: (error) => {
      return `Cannot contain the text ${error.value}`;
    },
    createFn: invalidTextValidatorFactory,
    priority: ValidatorPriority.Normal,
  };

  static manual: AppValidatorFactoryConfig<ManualValidatorArgs> = {
    name: 'manual',
    errorMessage: '',
    createFn: manualValidator,
    priority: ValidatorPriority.Lowest,
  };

  static fileNameCharactersOnly: AppValidatorConfig = {
    name: 'fileNameCharactersOnly',
    errorMessage:
      'Input cannot contain invalid characters (" ", "!", "@", "#", "$", "%", "<", ">", ":", """, "\\", "/", "|", "?", "*", "\'").',
    fn: fileNameCharactersOnlyValidator,
    priority: ValidatorPriority.Normal,
  };

  static numeric: AppValidatorConfig = {
    name: 'numeric',
    errorMessage: '',
    fn: numericValidator,
    priority: ValidatorPriority.Normal,
  };

  static notEmptyList: AppValidatorConfig = {
    name: 'notEmptyList',
    errorMessage: '',
    fn: notEmptyListValidator,
    priority: ValidatorPriority.Normal,
  };
}
