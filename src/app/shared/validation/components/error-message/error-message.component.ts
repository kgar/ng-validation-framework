import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div
      class="vf-validation-error-message"
      [attr.title]="title !== '' && title !== undefined && title !== null ? title : null"
    >
      {{ errorMessage }}
      <ng-content></ng-content>
    </div>
  `,
})
export class ErrorMessageComponent {
  @Input() errorMessage: string;
  @Input() title: string;
}
