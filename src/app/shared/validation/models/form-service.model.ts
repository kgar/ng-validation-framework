import { Observable } from 'rxjs';

export interface FormService {
  /**
   * Unsubscribe and otherwise release captured resources
   */
  dispose?: () => void;

  /**
   * Initialize the Reactive Form
   */
  init(): void;

  /**
   * Attempt to submit. True means success. False means validation caused the submission to fail.
   */
  validate(): Observable<boolean>;
}
