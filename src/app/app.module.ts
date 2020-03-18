import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SandboxFormService } from './sandbox/sandbox-form.service';
import { ValidationModule } from './shared/validation/validation.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, SandboxComponent, HomeComponent],
  imports: [
    ValidationModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharedModule,
  ],
  providers: [SandboxFormService],
  bootstrap: [AppComponent],
})
export class AppModule {}
