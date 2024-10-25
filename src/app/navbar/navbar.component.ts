import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageUsuariosComponent } from '../administrador/manage-usuarios/manage-usuarios.component';
import { ManageRolesComponent } from '../administrador/manage-roles/manage-roles.component'; // Importa el componente

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, ManageUsuariosComponent, ManageRolesComponent], // Asegúrate de importar el componente
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSubMenu: { [key: string]: boolean } = {
    admin: false
  };
  showUsuariosPanel = false; // Controla la visibilidad del panel de usuarios
  showRolesPanel = false;    // Controla la visibilidad del panel de roles

  toggleSubMenu(menu: string) {
    this.showSubMenu[menu] = !this.showSubMenu[menu];
  }

  toggleUsuariosPanel() {
    // Muestra/oculta el panel de usuarios y cierra el panel de roles
    this.showUsuariosPanel = !this.showUsuariosPanel;
    if (this.showUsuariosPanel) {
      this.showRolesPanel = false; // Cerrar el panel de roles si se abre el de usuarios
    }
  }

  toggleRolesPanel() {
    // Muestra/oculta el panel de roles y cierra el panel de usuarios
    this.showRolesPanel = !this.showRolesPanel;
    if (this.showRolesPanel) {
      this.showUsuariosPanel = false; // Cerrar el panel de usuarios si se abre el de roles
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}