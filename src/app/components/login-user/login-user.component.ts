import { Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../service/login-service.service';
import { NgClass, CommonModule } from '@angular/common';
import { NotificationServiceService } from '../../service/notification-service.service';

type ShowPasswordState = {
  password: boolean;
  confirmPassword: boolean;
  login: boolean;
};

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.scss'
})
export class LoginUserComponent {

  loginForm!: FormGroup;
  message: string = '';
  usuarioActual: string = '';

  userStatus: 'registered' | 'exists' | 'error' | 'unauthorized' | '' = '';
  showPassword: ShowPasswordState = {
    password: false,
    confirmPassword: false,
    login: false,
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,                                                                                                                                                                                 
    private router: Router,
    private notificationService: NotificationServiceService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

   loginUser() {
    const formData = {
      usuario: this.loginForm.value.usuario,
      password: this.loginForm.value.password,
    };

    this.loginService.validateLogin(formData).subscribe({
      next: (response) => {
        if (response.twoFactorEnabled) {
          this.usuarioActual  = formData.usuario;
          this.router.navigate(['validacion-auth'] , {
            queryParams: { usuarioActual: formData.usuario }
          });
          this.loginForm.reset();        
        } else {
          // Si no tiene 2FA habilitado, proceder a mostrar la página de bienvenida
          this.usuarioActual  = formData.usuario;
          this.loginForm.reset();
          this.router.navigate(['page-bienvenida'] , {
            queryParams: { usuarioActual: formData.usuario }
          });         
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.userStatus = 'unauthorized';
          this.message = 'Usuario o contraseña incorrectos';
        } else {
          this.userStatus = 'error';
          this.message = 'Ocurrió un error al iniciar sesión';
        }
        this.notificationService.showError(this.message);
      },
    });
  }
  togglePasswordVisibility(field: keyof ShowPasswordState) {
    this.showPassword[field] = !this.showPassword[field];
  } 
  mostrarFormularioRegistro() {
    this.router.navigate(['registro-user'])
  }
}
