import { AppValidatorConfig } from '../shared/validation/models/app-validator-config.model';
import { AppValidators } from '../shared/validation/services/app-validators.service';
import { ValidatorPriority } from '../shared/validation/models/validator-priority.enum';
import { Injectable } from '@angular/core';

@Injectable()
/* Determine if an interface can make this more maintainable */
export class KingOfTheHillManualValidator {
  public isValid = true;

  public validatorConfig: AppValidatorConfig = {
    name: 'kingOfTheHillAnimeManualValidator',
    errorMessage: 'King of the Hill is an anime',
    fn: AppValidators.manual.createFn({
      validationErrorKey: 'kingOfTheHillAnimeManualValidator',
      isValidCallback: () => this.isValid,
    }),
    priority: ValidatorPriority.Highest,
  };

  public controlsValidatorFn = AppValidators.manual.createFn({
    isValidCallback: () => this.isValid,
    validationErrorKey: 'kingOfTheHillAnimeManualValidator',
  });
}
