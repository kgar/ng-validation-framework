import { Observable } from 'rxjs';

export interface FormService {
  init(): void;
  dispose(): void;
  submit(): Observable<boolean>;
}
