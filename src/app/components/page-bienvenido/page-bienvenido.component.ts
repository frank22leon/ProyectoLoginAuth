import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';
import { LoginServiceService } from '../../service/login-service.service';

@Component({
  selector: 'app-page-bienvenido',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './page-bienvenido.component.html',
  styleUrl: './page-bienvenido.component.scss',
})
export class PageBienvenidoComponent {
  bienvenido!: FormGroup;
  usuarioActual: string = '';
  twoFactorEnabled: boolean = false;
  constructor(private route: ActivatedRoute,private router: Router,  private fb: FormBuilder, private loginService: LoginServiceService) {
    this.bienvenido = this.fb.group({
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioActual = params['usuarioActual'];
    });
    this.obtenerEstadoTwoFactorEnabled();
  }
  obtenerEstadoTwoFactorEnabled() {
    this.loginService.obtenerTwoFactorEnabled(this.usuarioActual)
      .subscribe((result: boolean) => {
        this.twoFactorEnabled = result;
      }, error => {
        console.error('Error al obtener el estado de TwoFactorEnabled:', error);
      });
  }
  logout() {
    this.usuarioActual = ''; // Resetea el usuario actual
    this.router.navigate(['login-user']); // Muestra el formulario de inicio de sesión
  }
  abrirFormularioActivar2FA() {
    this.router.navigate(['registro-auth'], {
      queryParams: { usuarioActual:  this.usuarioActual},
    })
  }
}

