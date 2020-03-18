import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export class ActivatedAsyncValidator implements AsyncValidator {
  enforceValidation = false;

  constructor(private asyncValidator: AsyncValidator) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (!this.enforceValidation){
      return of(null);
    }

    return this.asyncValidator.validate(control);
  }

  activate() {
    this.enforceValidation = true;
  }

  deactivate() {
    this.enforceValidation = false;
  }
}
