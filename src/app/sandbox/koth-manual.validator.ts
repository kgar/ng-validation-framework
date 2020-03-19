import { AppValidator } from '../shared/validation/models/app-validator.model';
import { AppValidators } from '../shared/validation/services/app-validators.service';
import { ValidatorPriority } from '../shared/validation/models/validator-priority.enum';
import { Injectable } from '@angular/core';

@Injectable()
/* Determine if an interface can make this more maintainable */
export class KingOfTheHillManualValidator {
  public isValid = true;

  public validator: AppValidator = {
    name: 'kingOfTheHillAnimeManualValidator',
    errorMessage: 'King of the Hill is an anime',
    fn: AppValidators.manual.fn({
      validationErrorKey: 'kingOfTheHillAnimeManualValidator',
      isValidCallback: () => this.isValid,
    }),
    priority: ValidatorPriority.Highest,
  };

  public controlsValidatorFn = AppValidators.manual.fn({
    isValidCallback: () => this.isValid,
    validationErrorKey: 'kingOfTheHillAnimeManualValidator',
  });
}
