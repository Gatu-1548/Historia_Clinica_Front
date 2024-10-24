import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importa RouterModule para enlaces de rutas
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar *ngIf

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // Añade CommonModule aquí
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSubMenu: { [key: string]: boolean } = {  // Permitir claves dinámicas
    admin: false
  };

  // Método para alternar submenús
  toggleSubMenu(menu: string) {  // Usar 'string' para cualquier menú
    this.showSubMenu[menu] = !this.showSubMenu[menu];
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirige al home al cerrar sesión
  }
}