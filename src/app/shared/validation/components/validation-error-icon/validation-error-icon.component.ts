import { Component } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-validation-error-icon',
  template: `
    <fa-icon [icon]="faExclamationCircle" class="vf-error-icon"></fa-icon>
  `,
})
export class ValidationErrorIconComponent {
  faExclamationCircle = faExclamationCircle;
}
