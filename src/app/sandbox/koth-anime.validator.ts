import { FormGroup } from '@angular/forms';
import { SandboxForm } from './sandbox-form.model';
import { ValidatorPriority } from '../shared/validation/models/validator-priority.enum';
import { AppConfigurableValidator } from '../shared/validation/models/app-configurable-validator.model';

type FormGroupProvider = () => FormGroup;

export function KingOfTheHillAnimeValidatorFn(formGroupProvider: FormGroupProvider) {
  return (): { [key: string]: any } | null => {
    const formModel = formGroupProvider()?.value as SandboxForm;

    if (formModel === undefined) {
      return;
    }

    const containsInvalidCombination =
      formModel.name?.toLocaleLowerCase()?.trim() === 'king of the hill' &&
      formModel.animationType !== 'anime';

    return containsInvalidCombination ? { kingOfTheHillAnime: true } : null;
  };
}

export const KingOfTheHillAnimeValidator: AppConfigurableValidator<FormGroupProvider> = {
  name: 'kingOfTheHillAnime',
  errorMessage: 'King of the Hill is an anime',
  fn: KingOfTheHillAnimeValidatorFn,
  priority: ValidatorPriority.Highest,
};
