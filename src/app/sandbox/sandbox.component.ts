import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from '../shared/services/validation-metadata.service';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  sandboxFormGroup: FormGroup;
  faInfoCircle = faInfoCircle;

  ngOnInit(): void {
    const fb = new FormBuilder();

    this.sandboxFormGroup = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      'animation-type': ['', [Validators.required]],
      description: ['Description here.', [Validators.maxLength(300), Validators.minLength(50)]],
    });
  }

  onSubmit() {
    this.sandboxFormGroup.markAllAsTouched();

    if (!this.sandboxFormGroup.valid) {
      return;
    }

    alert('You did it!');
  }

  deselectAnimationType() {
    this.sandboxFormGroup.get('animation-type').patchValue('');
  }
}
