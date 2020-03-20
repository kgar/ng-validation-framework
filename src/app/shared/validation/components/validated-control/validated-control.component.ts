import { Component, Input, OnInit, ElementRef, ContentChild } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { ValidatedComponentBase } from '../../models/validated-component-base.model';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-validated-control',
  templateUrl: './validated-control.component.html',
})
export class ValidatedControlComponent extends ValidatedComponentBase implements OnInit {
  @ContentChild(NgControl) control: NgControl;
  @Input() label = undefined;
  @Input() labelFor = '';
  @Input() useLabelAndErrorIconProps = true;

  public get errorMessage() {
    if (this.control?.errors?.validatedControlForcedError) {
      return '';
    }

    return super.getHighestPriorityErrorMessage(this.control);
  }

  public get showError() {
    return super.shouldShowError(this.control);
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
