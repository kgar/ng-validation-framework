import { Component, OnInit, OnDestroy } from '@angular/core';
import { faInfoCircle, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { SandboxFormService } from './sandbox-form.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle;
  faPizzaSlice = faPizzaSlice;
  isSubmitting = false;

  get formGroup() {
    return this.formService?.formGroup;
  }

  get remainingDescriptionCharacters(): number {
    const descriptionCharacterCount = (this.formService.formGroup.get('description')
      .value as string).length;
    return this.formService.descriptionMaxLength - descriptionCharacterCount;
  }

  constructor(public formService: SandboxFormService) {}

  ngOnInit(): void {
    this.formService.init();
  }

  ngOnDestroy(): void {
    this.formService.dispose();
  }

  onSubmit() {
    this.isSubmitting = true;
    this.formService
      .submit()
      .pipe(tap(() => (this.isSubmitting = false)))
      .subscribe(success => {
        if (success) {
          alert('You did it!');
        }
      });
  }

  deselectAnimationType() {
    this.formService.patch({ animationType: '' });
  }

  kothTest(passingTest: boolean) {
    this.formService.patch({
      description: 'Description. Description. Description. Description.',
      name: 'King of the Hill',
      animationType: passingTest ? 'anime' : 'cartoon',
      alphanumericCharacters: 'hi there',
      currentShowRunInfo: {
        firstAirDate: new Date(),
        totalSeasonsToDate: 1,
      },
      imaginaryShowRunInfo: {
        firstAirDate: new Date(),
        totalSeasonsToDate: 1,
      },
      nextShowRunInfo: {
        firstAirDate: new Date(),
        totalSeasonsToDate: 1,
      },
    });
    this.onSubmit();
  }
}
