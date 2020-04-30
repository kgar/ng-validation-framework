import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

export interface SubscribedFormGroup {
  formSubscriptions: Subscription[];
  formGroup: FormGroup;
}
