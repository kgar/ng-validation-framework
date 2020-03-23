import { ShowRunInfoForm } from '../shared/components/show-run-info/show-run-info-form.model';

export interface SandboxForm {
  name: string;
  animationType: string;
  description: string;
  currentShowRunInfo: ShowRunInfoForm;
  nextShowRunInfo: ShowRunInfoForm;
  imaginaryShowRunInfo: ShowRunInfoForm;
  alphanumericCharacters: string;
}
