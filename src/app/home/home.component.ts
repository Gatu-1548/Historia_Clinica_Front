import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa el servicio Router

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  goToRegister() {
    this.router.navigate(['/register']);  // Redirige manualmente al componente de registro
  }

  goToLogin() {
    this.router.navigate(['/login']);  // Redirige manualmente al componente de login
  }
}
