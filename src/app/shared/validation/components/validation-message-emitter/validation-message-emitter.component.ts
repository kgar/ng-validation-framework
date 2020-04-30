import { Component, OnInit, Input } from '@angular/core';
import { ValidatedComponentBase } from '../../models/validated-component-base.model';
import { AbstractControl } from '@angular/forms';

/**
 * Component designed to emit validation messages when the targeted control is in an errored state and has messages to show.
 * Can be used directly in order to specifically place all error messages.
 * Can also be used with a subset of error message types to allow custom placement of a subset of error messages.
 */
@Component({
  selector: 'app-validation-message-emitter',
  template: `
    <div [attr.title]="showError && messageExceedsCharacterLimit ? errorMessage : null">
      <ng-content></ng-content>
      <app-error-message *ngIf="useDefaultMessagePlacement && showError">
        <ng-container
          *ngIf="messageExceedsCharacterLimit; then shortenedMessage; else fullMessage"
        ></ng-container>
        <ng-template #fullMessage>
          {{ errorMessage }}
        </ng-template>
        <ng-template #shortenedMessage>
          Invalid input
        </ng-template>
      </app-error-message>
    </div>
  `,
})
export class ValidationMessageEmitterComponent extends ValidatedComponentBase implements OnInit {
  @Input() targetControl: AbstractControl;
  @Input() filteredErrorTypes?: string[];
  @Input() errorMessageCharacterLimit?: number = undefined;

  get messageExceedsCharacterLimit() {
    return (
      this.errorMessageCharacterLimit !== undefined &&
      this.errorMessage.length > this.errorMessageCharacterLimit
    );
  }

  ngOnInit(): void {
    if (this.targetControl === undefined) {
      throw new Error('Validation Message Decorator requires an abstract control to watch.');
    }
  }

  public get errorMessage() {
    return super.getHighestPriorityErrorMessage(this.targetControl, this.filteredErrorTypes);
  }

  public get showError() {
    const isApplyingFilteredMessaging =
      !!this.filteredErrorTypes && this.filteredErrorTypes.length > 0;

    const shouldCheckForShowError =
      (isApplyingFilteredMessaging && this.hasFilteredError()) || !isApplyingFilteredMessaging;

    return shouldCheckForShowError && super.shouldShowError(this.targetControl);
  }

  hasFilteredError() {
    if (!this.targetControl.errors) return false;
    const currentErrors = Object.keys(this.targetControl.errors);
    return currentErrors.some((e) => this.filteredErrorTypes.indexOf(e) >= 0);
  }
}
