import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="vf-validation-error-message">
      {{ errorMessage }}
    </div>
  `,
})
export class ErrorMessageComponent {
  @Input() errorMessage: string;
}
