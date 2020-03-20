import { AppValidators } from '../../validation/services/app-validators.service';

export class ShowRunInfoValidators {
  public static get totalSeasonsToDateValidators() {
    return [AppValidators.min.createFn(1), AppValidators.max.createFn(9000)];
  }
}
