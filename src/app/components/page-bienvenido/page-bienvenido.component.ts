import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { NgClass, CommonModule } from '@angular/common';

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
  constructor(private route: ActivatedRoute,private router: Router,  private fb: FormBuilder,) {
    this.bienvenido = this.fb.group({
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.usuarioActual = params['usuarioActual'];
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

