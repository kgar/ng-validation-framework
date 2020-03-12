import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from '../shared/services/validation-metadata.service';

@Component({
  selector: 'app-validated-control',
  templateUrl: './validated-control.component.html',
  styleUrls: ['./validated-control.component.scss'],
})
export class ValidatedControlComponent implements OnInit {
  @ContentChild(NgControl) control: NgControl;
  faExclamationCircle = faExclamationCircle;
  @Input() label = undefined;
  @Input() labelFor = '';

  includeDefaultErrorIcon = true;
  includeDefaultLabel = true;

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

  ngOnInit(): void {}
}
