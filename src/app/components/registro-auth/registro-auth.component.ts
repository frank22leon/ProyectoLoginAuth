import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from '../../service/login-service.service';
import { NgClass, CommonModule } from '@angular/common';
import { NotificationServiceService } from '../../service/notification-service.service';

@Component({
  selector: 'app-registro-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './registro-auth.component.html',
  styleUrl: './registro-auth.component.scss',
})
export class RegistroAuthComponent {
  twoFactorForm!: FormGroup;
  message: string = '';
  qrCodeImageUrl: string = '';
  usuarioActual: string = '';
  codigo2FAInvalido: boolean = false;
  userStatus: 'registered' | 'exists' | 'error' | 'unauthorized' | '' = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private notificationService: NotificationServiceService
  ) {
    this.twoFactorForm = this.fb.group({
      codigo2FA: ['', Validators.required],
      usuarioActual: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioActual = params['usuarioActual'];
    });
    this.generarQR();
  }

  validarCodigo2FA() {
    const usuario = this.usuarioActual;
    const codigo = this.twoFactorForm.value.codigo2FA;

    this.loginService.validarCodigo(usuario, codigo).subscribe({
      next: (isValid) => {
        if (isValid) {          
          this.notificationService.showError('Código 2FA válido. Autenticación exitosa.');
          this.router.navigate(['page-bienvenida'] , {
            queryParams: { usuarioActual: usuario }
          });
        } else {
          this.notificationService.showError('Código 2FA inválido. Por favor, intenta nuevamente.');
          this.codigo2FAInvalido = true;
        }
        this.twoFactorForm.reset();
      },
      error: (error) => {
        this.notificationService.showError('Error al validar código 2FA');
        this.twoFactorForm.reset();
      },
    });
  }

  generarQR() {
    const usuario = this.usuarioActual;
    this.loginService.obtenerQRCode(usuario).subscribe({
      next: (imgQR) => {
        // Asignar la URL del QR para mostrarlo en la interfaz
        this.qrCodeImageUrl = imgQR;
      },
      error: (error) => {
        this.notificationService.showError('Error al obtener el código QR:');
      },
    });
  }
  mostrarFormularioRegistro() {
    this.router.navigate(['register-user'])
  }
}
