import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonsModule,
    BrowserAnimationsModule,
    InputsModule,
    DateInputsModule,
    TooltipModule,
  ],
  exports: [ButtonsModule, BrowserAnimationsModule, InputsModule, DateInputsModule, TooltipModule],
})
export class KendoModule {}
