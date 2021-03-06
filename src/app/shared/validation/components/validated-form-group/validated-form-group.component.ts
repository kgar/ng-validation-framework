import { Component, ContentChild } from '@angular/core';
import { ValidatedComponentBase } from '../../models/validated-component-base.model';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-validated-form-group',
  template: `
    <ng-content></ng-content>
    <app-error-message
      *ngIf="useDefaultMessagePlacement && showError"
      [errorMessage]="errorMessage"
    ></app-error-message>
  `,
})
export class ValidatedFormGroupComponent extends ValidatedComponentBase {
  @ContentChild(FormGroupDirective) formGroup: FormGroupDirective;

  public get errorMessage() {
    return super.getHighestPriorityErrorMessage(this.formGroup);
  }

  public get showError() {
    return super.shouldShowError(this.formGroup);
  }
}
