import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:7098/api/UsuarioLogin/';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private isLoggedInStatus = false;
  private isTwoFactorAuthenticatedStatus = false;

  constructor(private http: HttpClient) { }

  createUser(data: any): Observable<any> {
    return this.http.post(baseUrl + 'InsertarUsuario', data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  validateLogin(data: any): Observable<any> {
    return this.http.post(baseUrl + 'ValidarLogin', data, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  obtenerQRCode(usuario: string): Observable<string> {
    const url = `${baseUrl}GetQRCode?usuario=${usuario}`;
    return this.http.get<string>(url, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json' // Indicar que esperamos texto plano como respuesta
    });
  }
  validarCodigo(usuario: string, code: string): Observable<boolean> {
    const url = `${baseUrl}validarQRCode?usuario=${usuario}&code=${code}`;
    return this.http.get<boolean>(url);
  }
  obtenerTwoFactorEnabled(usuario: string): Observable<boolean> {
    const url = `${baseUrl}GetTwoFactorEnabled?usuario=${usuario}`;
    return this.http.get<boolean>(url);
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      // Añadir otros headers necesarios aquí, como tokens de autorización si es necesario
    });
  }
  setLoginStatus(status: boolean) {
    this.isLoggedInStatus = status;
  }
  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
  setTwoFactorAuthenticatedStatus(status: boolean) {
    this.isTwoFactorAuthenticatedStatus = status;
  }
  isTwoFactorAuthenticated(): boolean {
    return this.isTwoFactorAuthenticatedStatus;
  }
}
