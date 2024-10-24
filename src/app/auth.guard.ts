import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');  // Revisa si el token está almacenado en localStorage
    if (token) {
      return true;  // Si el token existe, permite el acceso
    } else {
      this.router.navigate(['/login']);  // Si no hay token, redirige al login
      return false;
    }
  }
}
