import { Component, OnInit, OnDestroy } from '@angular/core';
import { faInfoCircle, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { SandboxFormService } from './sandbox-form.service';
import { KingOfTheHillAnimeValidator } from './koth-anime.validator';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle;
  faPizzaSlice = faPizzaSlice;
  customFormValidators = [KingOfTheHillAnimeValidator];

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
    this.formService.submit().subscribe(success => {
      if (success) {
        alert('You did it!');
      }
    });
  }

  deselectAnimationType() {
    this.formService.patch({ animationType: '' });
  }
}
