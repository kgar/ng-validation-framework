import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from '../../validation.service';
import { ValidatedComponentBase } from '../../models/validated-component-base.model';

@Component({
  selector: 'app-validated-control',
  templateUrl: './validated-control.component.html',
  styleUrls: ['./validated-control.component.scss'],
})
export class ValidatedControlComponent extends ValidatedComponentBase implements OnInit {
  faExclamationCircle = faExclamationCircle;
  @Input() label = undefined;
  @Input() labelFor = '';
  @Input() useLabelAndErrorIconProps = true;
  @Input() set forceValidationDecoration(val: boolean) {
    if (val) {
      this.control?.control.setErrors({ validatedControlForcedError: true });
    } else {
      this.control?.control.setErrors(null);
    }
  }

  public get errorMessage() {
    if (this.control?.errors?.validatedControlForcedError) {
      return '';
    }

    return super.errorMessage;
  }

  public get showError() {
    return this.forceValidationDecoration || super.showError;
  }

  constructor(vs: ValidationService, private ref: ElementRef) {
    super(vs);
  }

  ngOnInit(): void {
    this.useLabelAndErrorIconProps =
      this.useLabelAndErrorIconProps &&
      !(this.ref.nativeElement as HTMLElement).querySelector('[validation-label]') &&
      this.label !== undefined &&
      this.label !== null;
  }
}
