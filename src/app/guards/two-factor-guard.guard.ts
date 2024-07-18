// two-factor.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class TwoFactorGuard implements CanActivate {

  constructor(private authService: LoginServiceService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isTwoFactorAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['validacion-auth']);
      return false;
    }
  }
}
