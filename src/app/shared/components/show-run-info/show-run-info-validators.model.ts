import { AppValidators } from '../../validation/app-validators.service';

export class ShowRunInfoValidators {
  public static get totalSeasonsToDateValidators() {
    return [AppValidators.min.fn(1), AppValidators.max.fn(9000)];
  }
}
