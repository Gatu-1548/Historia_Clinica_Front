import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClient
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://backend-historialclinico.onrender.com';  // URL base de tu backend

  constructor(private http: HttpClient) { }  // Asegúrate de que HttpClient sea parte del constructor

  // Método para registrar usuario
  register(userData: any): Observable<any> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post(url, userData);
  }

  // Método para login
login(credentials: any): Observable<any> {
  const url = `${this.baseUrl}/auth/login`;
  return this.http.post(url, credentials).pipe(
    tap((response: any) => {
      // Almacena el token en localStorage si la autenticación es exitosa
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
    })
  );
}

  // Otros métodos pueden ir aquí
}