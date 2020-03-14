import { Component, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-validation-error-icon',
  templateUrl: './validation-error-icon.component.html',
  styleUrls: ['./validation-error-icon.component.scss']
})
export class ValidationErrorIconComponent {
  faExclamationCircle = faExclamationCircle;
}
