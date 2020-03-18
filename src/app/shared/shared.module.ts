import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowRunInfoComponent } from './components/show-run-info/show-run-info.component';
import { ValidationModule } from './validation/validation.module';
import { KendoModule } from './kendo/kendo.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowRunInfoComponent],
  imports: [CommonModule, ValidationModule, KendoModule, ReactiveFormsModule],
  exports: [CommonModule, ValidationModule, KendoModule, ReactiveFormsModule, ShowRunInfoComponent],
})
export class SharedModule {}
