import { Component, ContentChild } from '@angular/core';
import { ValidatedComponentBase } from '../../models/validated-component-base.model';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-validated-form-group',
  templateUrl: './validated-form-group.component.html',
  styleUrls: ['./validated-form-group.component.scss'],
})
export class ValidatedFormGroupComponent extends ValidatedComponentBase {
  @ContentChild(FormGroupDirective) formGroup: FormGroupDirective;

  public get errorMessage() {
    return super.getHighestPriorityErrorMessage(this.formGroup);
  }

  public get showError() {
    console.log('show error for form group', this.formGroup);
    return super.shouldShowError(this.formGroup);
  }
}
