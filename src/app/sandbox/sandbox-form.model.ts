import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

export interface SandboxForm {
  name?: string;
  animationType?: string;
  description?: string;
  firstAirDate?: Date;
  totalSeasonsToDate?: number;
}
