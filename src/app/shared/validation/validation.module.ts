import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatedControlComponent } from './components/validated-control/validated-control.component';
import { ValidatedFormGroupComponent } from './components/validated-form-group/validated-form-group.component';
import { ValidationErrorIconComponent } from './components/validation-error-icon/validation-error-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MappedFormBuilder } from './services/mapped-form-builder.service';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  providers: [MappedFormBuilder],
  declarations: [
    ValidatedControlComponent,
    ValidationErrorIconComponent,
    ValidatedFormGroupComponent,
    ErrorMessageComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [ValidatedControlComponent, ValidationErrorIconComponent, ValidatedFormGroupComponent, ErrorMessageComponent],
})
export class ValidationModule {}
