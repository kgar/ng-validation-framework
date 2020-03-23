import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SandboxFormService } from './sandbox/sandbox-form.service';
import { ValidationModule } from './shared/validation/validation.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { KingOfTheHillValidationService } from './sandbox/services/king-of-the-hill-validation.service';
import { KingOfTheHillManualValidator } from './sandbox/koth-manual.validator';

@NgModule({
  declarations: [AppComponent, SandboxComponent, LoginComponent],
  imports: [
    ValidationModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule,
  ],
  providers: [SandboxFormService, KingOfTheHillValidationService, KingOfTheHillManualValidator],
  bootstrap: [AppComponent],
})
export class AppModule {}
