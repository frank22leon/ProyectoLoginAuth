import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { PageBienvenidoComponent } from './components/page-bienvenido/page-bienvenido.component';
import { RegistroAuthComponent } from './components/registro-auth/registro-auth.component';
import { RegistroUserComponent } from './components/registro-user/registro-user.component';
import { ValidacionAuthComponent } from './components/validacion-auth/validacion-auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login-user', pathMatch: 'full' },
  { path: 'login-user', component: LoginUserComponent },
  { path: 'page-bienvenida', component: PageBienvenidoComponent },
  { path: 'registro-auth', component: RegistroAuthComponent },
  { path: 'registro-user', component: RegistroUserComponent },
  { path: 'validacion-auth', component: ValidacionAuthComponent },
  { path: '**', redirectTo: '/login-user', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
