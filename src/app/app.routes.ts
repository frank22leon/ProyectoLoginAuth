// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { PageBienvenidoComponent } from './components/page-bienvenido/page-bienvenido.component';
import { RegistroAuthComponent } from './components/registro-auth/registro-auth.component';
import { RegistroUserComponent } from './components/registro-user/registro-user.component';
import { ValidacionAuthComponent } from './components/validacion-auth/validacion-auth.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { TwoFactorGuard } from './guards/two-factor-guard.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login-user', pathMatch: 'full' },
  { path: 'login-user', component: LoginUserComponent },
  { path: 'page-bienvenida', component: PageBienvenidoComponent, canActivate: [AuthGuard, TwoFactorGuard] },
  { path: 'registro-auth', component: RegistroAuthComponent, canActivate: [AuthGuard] },
  { path: 'registro-user', component: RegistroUserComponent },
  { path: 'validacion-auth', component: ValidacionAuthComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login-user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
