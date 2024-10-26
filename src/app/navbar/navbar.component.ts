import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageUsuariosComponent } from '../administrador/manage-usuarios/manage-usuarios.component';
import { ManageRolesComponent } from '../administrador/manage-roles/manage-roles.component';
import { ManageEspecialidadesComponent } from '../registro/manage-especialidades/manage-especialidades.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, ManageUsuariosComponent, ManageRolesComponent, ManageEspecialidadesComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSubMenu: { [key: string]: boolean } = {
    admin: false,
    registros: false
  };
  showUsuariosPanel = false;
  showRolesPanel = false;
  showEspecialidadesPanel = false;

  toggleSubMenu(menu: string) {
    this.showSubMenu[menu] = !this.showSubMenu[menu];
  }

  toggleUsuariosPanel() {
    this.showUsuariosPanel = !this.showUsuariosPanel;
    if (this.showUsuariosPanel) {
      this.showRolesPanel = false;
      this.showEspecialidadesPanel = false;
    }
  }

  toggleRolesPanel() {
    this.showRolesPanel = !this.showRolesPanel;
    if (this.showRolesPanel) {
      this.showUsuariosPanel = false;
      this.showEspecialidadesPanel = false;
    }
  }

  toggleEspecialidadesPanel() {
    this.showEspecialidadesPanel = !this.showEspecialidadesPanel;
    if (this.showEspecialidadesPanel) {
      this.showUsuariosPanel = false;
      this.showRolesPanel = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}