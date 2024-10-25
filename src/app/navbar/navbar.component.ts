import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageUsuariosComponent } from '../administrador/manage-usuarios/manage-usuarios.component'; // Importa el componente

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, ManageUsuariosComponent], // Asegúrate de importar el componente
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSubMenu: { [key: string]: boolean } = {
    admin: false
  };
  showUsuariosPanel = false; // Controla la visibilidad del panel de usuarios

  toggleSubMenu(menu: string) {
    this.showSubMenu[menu] = !this.showSubMenu[menu];
  }

  toggleUsuariosPanel() {
    this.showUsuariosPanel = !this.showUsuariosPanel; // Muestra/oculta el panel de usuarios
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}