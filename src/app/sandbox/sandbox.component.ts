import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent implements OnInit {
  sandboxFormGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const fb = new FormBuilder();

    this.sandboxFormGroup = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
