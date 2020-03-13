import { Component, ContentChild, Input, OnInit, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from '../shared/validation/validation.service';
import { CustomValidationErrorMessages } from '../shared/validation/models/custom-validation-error-messages.model';

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
  @Input() customValidationMessages: CustomValidationErrorMessages = {};
  useLabelAndErrorIconProps = true;
  includeDefaultLabel = true;

  public get errorMessage() {
    const errors = this.control?.errors;
    if (!errors) {
      return '';
    }
    const topError = this.vs.getHighestPriorityError(this.control.errors);
    const customErrorMessage = this.customValidationMessages[topError.name];
    const errorMessage =
      customErrorMessage !== undefined
        ? this.vs.extractErrorMessage(topError.name, customErrorMessage, this.control.errors)
        : this.vs.extractErrorMessage(topError.name, topError.errorMessage, this.control.errors);
    return errorMessage;
  }

  public get showError() {
    return this.vs.showError(this.control);
  }

  constructor(private vs: ValidationService, private ref: ElementRef) {}

  ngOnInit(): void {
    this.useLabelAndErrorIconProps =
      !(this.ref.nativeElement as HTMLElement).querySelector('[validation-label]') &&
      this.label !== undefined &&
      this.label !== null;
  }
}
