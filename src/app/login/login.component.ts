import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginFormService } from './login-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  get formGroup() {
    return this.formService.formGroup;
  }

  get customFormGroupValidators() {
    return this.formService.customFormGroupValidators;
  }

  constructor(private formService: LoginFormService) {}

  ngOnInit(): void {
    this.formService.init();
    this.formService.patch({ username: 'kgar' });
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
}
