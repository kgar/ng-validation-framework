import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { ValidatorPriority } from '../shared/validation/models/validator-priority.enum';
import { AppValidator } from '../shared/validation/models/app-validator.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const KingOfTheHillAnimeAsyncValidator: AsyncValidator = {
  validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
    return of(KingOfTheHillAnimeValidatorFn(control)).pipe(delay(2500));
  },
};

export function KingOfTheHillAnimeValidatorFn(
  formGroup: AbstractControl,
): { [key: string]: any } | null {
  const formModel = formGroup?.value as SandboxForm;

  if (formModel === undefined) {
    return;
  }

  const containsInvalidCombination =
    formModel.name?.toLocaleLowerCase()?.trim() === 'king of the hill' &&
    formModel.animationType !== 'anime';

  return containsInvalidCombination ? { kingOfTheHillAnime: true } : null;
}

export const KingOfTheHillAnimeValidator: AppValidator = {
  name: 'kingOfTheHillAnime',
  errorMessage: 'King of the Hill is an anime',
  fn: KingOfTheHillAnimeAsyncValidator,
  priority: ValidatorPriority.Highest,
};
