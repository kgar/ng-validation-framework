import { Component, ContentChild, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from '../shared/services/validation-metadata.service';

@Component({
  selector: 'app-validated-control',
  templateUrl: './validated-control.component.html',
  styleUrls: ['./validated-control.component.scss'],
})
export class ValidatedControlComponent {
  @ContentChild(NgControl) control: NgControl;
  faInfoCircle = faInfoCircle;
  @Input() label = '';

  get errorMessage() {
    const errors = this.control?.errors;
    if (!errors) {
      return '';
    }
    const topError = this.validationService.getHighestPriorityError(this.control.errors);
    const errorMessage =
      typeof topError.errorMessage === 'function'
        ? topError.errorMessage(this.control.errors[topError.name])
        : topError.errorMessage;
    return errorMessage;
  }

  get showError() {
    return this.validationService.showError(this.control);
  }

  constructor(private validationService: ValidationService) {}
}
