import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatedControlComponent } from './components/validated-control/validated-control.component';
import { ValidatedFormGroupComponent } from './components/validated-form-group/validated-form-group.component';
import { ValidationErrorIconComponent } from './components/validation-error-icon/validation-error-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ValidationMessageEmitterComponent } from './components/validation-message-emitter/validation-message-emitter.component';

@NgModule({
  declarations: [
    ValidatedControlComponent,
    ValidationErrorIconComponent,
    ValidatedFormGroupComponent,
    ErrorMessageComponent,
    ValidationMessageEmitterComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ValidatedControlComponent,
    ValidationErrorIconComponent,
    ValidatedFormGroupComponent,
    ErrorMessageComponent,
    ValidationMessageEmitterComponent
  ],
})
export class ValidationModule {}
