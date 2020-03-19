import { Component } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-validation-error-icon',
  templateUrl: './validation-error-icon.component.html',
})
export class ValidationErrorIconComponent {
  faExclamationCircle = faExclamationCircle;
}
