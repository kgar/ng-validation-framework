import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox/sandbox.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/sandbox', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sandbox', component: SandboxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
