import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ValidatedControlComponent } from './validated-control/validated-control.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';


@NgModule({
  declarations: [AppComponent, SandboxComponent, ValidatedControlComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FontAwesomeModule, ButtonsModule, BrowserAnimationsModule, InputsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
