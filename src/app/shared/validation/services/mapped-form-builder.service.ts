import { Injectable } from '@angular/core';
import { FormBuilder, AbstractControlOptions, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { MappedAbstractControlConfig } from '../models/mapped-abstract-control-config.model';

@Injectable()
/**
 * A decorator for the Angular FormBuilder service which allows for
 * the creation of form groups / arrays / controls that adhere to
 * a TypeScript interface.
 */
export class MappedFormBuilder {
  constructor(private formBuilder: FormBuilder) {}

  public group<T>(
    mappedControlsConfig: MappedAbstractControlConfig<T>,
    options?:
      | AbstractControlOptions
      | {
          [key: string]: any;
        }
      | null,
  ) {
    return this.formBuilder.group(mappedControlsConfig, options);
  }

  public array<T>(
    mappedControlsConfig: MappedAbstractControlConfig<T>[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    return this.formBuilder.array(mappedControlsConfig, validatorOrOpts, asyncValidator);
  }

  public control(
    formState: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null,
  ) {
    return this.formBuilder.control(formState, validatorOrOpts, asyncValidator);
  }
}
