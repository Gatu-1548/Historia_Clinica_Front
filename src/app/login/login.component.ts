import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';  // Servicio API para realizar la solicitud HTTP
import { HttpClientModule } from '@angular/common/http';  // Módulo HTTP
import { FormsModule } from '@angular/forms';  // Para ngModel


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ HttpClientModule, FormsModule]
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
    isWebAccess: "true"
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    console.log('Datos de login:', this.loginData);  // Verifica que los datos sean correctos
    this.apiService.login(this.loginData).subscribe(response => {
      console.log('Usuario autenticado:', response);
      localStorage.setItem('token', response.token);  // Almacenar el token en localStorage
      this.router.navigate(['/dashboard']);  // Redirigir al dashboard después del login
    }, error => {
      console.error('Error en el login:', error);
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);  // Redirige manualmente al componente de registro
  }
}
