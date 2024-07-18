import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
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
  selector: 'app-registro-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './registro-user.component.html',
  styleUrl: './registro-user.component.scss',
})
export class RegistroUserComponent {
  registerForm!: FormGroup;
  message: string = '';
  activar2FA: boolean = false;
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
    this.registerForm = this.fb.group(
      {
        usuario: ['', Validators.required],
        password: ['', [Validators.required, this.passwordStrengthValidator]],
        confirmPassword: ['', Validators.required],
        activar2FAControl: [false], // Asegúrate de inicializarlo correctamente
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() {}

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    }
    return null;
  }

  passwordStrengthValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return { weak: true };

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecial = /[\W_]+/.test(value);

    const isValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    return isValid ? null : { weak: true };
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.message = 'Por favor, completa el formulario correctamente';
      this.notificationService.showError(this.message);
      return;
    }

    const formData = {
      usuario: this.registerForm.value.usuario,
      password: this.registerForm.value.password,
      TwoFactorEnabled: 0,
      TwoFactorSecret: '',
      fecha: new Date(),
    };

    this.activar2FA = this.registerForm.value.activar2FAControl;

    this.loginService.createUser(formData).subscribe({
      next: (response) => {
        this.userStatus = 'registered';
        this.message = 'Usuario registrado exitosamente';
        this.notificationService.showError(this.message);
        this.usuarioActual = formData.usuario;
        if (this.activar2FA) {
          this.router.navigate(['registro-auth'], {
            queryParams: { usuarioActual: formData.usuario },
          });
          this.registerForm.reset();
        } else {
          this.router.navigate(['page-bienvenida'], {
            queryParams: { usuarioActual: formData.usuario },
          });
          this.registerForm.reset();
        }
      },
      error: (error) => {
        if (error.status === 409) {
          this.userStatus = 'exists';
          this.message = 'El usuario ya existe';
        } else {
          this.userStatus = 'error';
          this.message = 'Ocurrió un error al registrar el usuario';
        }
        this.notificationService.showError(this.message);
      },
    });
  }
  togglePasswordVisibility(field: keyof ShowPasswordState) {
    this.showPassword[field] = !this.showPassword[field];
  }
  mostrarFormularioLogin() {
    this.router.navigate(['login-user']);
  }
}
