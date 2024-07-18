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
  selector: 'app-validacion-auth',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './validacion-auth.component.html',
  styleUrl: './validacion-auth.component.scss'
})
export class ValidacionAuthComponent { 
  validacion2FAForm!: FormGroup;
  message: string = '';
  usuarioActual: string = '';
  codigo2FAInvalido: boolean = false; 

  userStatus: 'registered' | 'exists' | 'error' | 'unauthorized' | '' = '';


  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,                                                                                                                                                                                 
    private router: Router, private route: ActivatedRoute,
    private notificationService: NotificationServiceService   
  ) {  
    this.validacion2FAForm = this.fb.group({
      codigo2FA: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioActual = params['usuarioActual'];
    });
  }

  validarCodigo2FA() {
    const usuario = this.usuarioActual;
    const codigo = this.validacion2FAForm.value.codigo2FA;

    console.log(usuario, codigo);
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
        this.validacion2FAForm.reset();
      },
      error: (error) => {
        this.notificationService.showError('Error al validar código 2FA');
        this.validacion2FAForm.reset();
      },
    });
  }
}
