import { ShowRunInfoForm } from '../shared/components/show-run-info/show-run-info-form.model';

export interface SandboxForm extends ShowRunInfoForm {
  name?: string;
  animationType?: string;
  description?: string;
  firstAirDate?: Date;
  totalSeasonsToDate?: number;
  alphanumericCharacters?: string;
}
