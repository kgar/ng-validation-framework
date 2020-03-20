import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeFormService } from './home-form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  get formGroup() {
    return this.formService.formGroup;
  }

  get customFormGroupValidators() {
    return this.formService.customFormGroupValidators;
  }

  constructor(private formService: HomeFormService) {}

  ngOnInit(): void {
    this.formService.init();
    this.formService.patch({ username: 'kgar' });
  }

  ngOnDestroy(): void {
    this.formService.dispose();
  }

  onSubmit() {
    this.formService.submit().subscribe(success => {
      console.log('did it succeed?', success);
      if (success) {
        alert('You did it!');
      }
    });
  }
}
