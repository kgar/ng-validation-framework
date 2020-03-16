import { FormControl } from '@angular/forms';

export interface TextMustMatchArgs {
  targetToMatch: FormControl;
  targetDisplayName: string;
}
