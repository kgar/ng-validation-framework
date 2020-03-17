import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { SandboxFormService } from './sandbox/sandbox-form.service';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ValidationModule } from './shared/validation/validation.module';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [AppComponent, SandboxComponent, HomeComponent],
  imports: [
    ValidationModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonsModule,
    BrowserAnimationsModule,
    InputsModule,
    DateInputsModule,
    TooltipModule,
  ],
  providers: [SandboxFormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
