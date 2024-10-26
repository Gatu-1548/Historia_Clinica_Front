import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageUsuariosComponent } from '../administrador/manage-usuarios/manage-usuarios.component';
import { ManageRolesComponent } from '../administrador/manage-roles/manage-roles.component';
import { ManageEspecialidadesComponent } from '../registro/manage-especialidades/manage-especialidades.component';
import { ManageEmpleadosComponent } from '../personal/manage-empleados/manage-empleados.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ManageUsuariosComponent,
    ManageRolesComponent,
    ManageEspecialidadesComponent,
    ManageEmpleadosComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSubMenu: { [key: string]: boolean } = {
    admin: false,
    registros: false,
    personal: false,
  };
  showUsuariosPanel = false;
  showRolesPanel = false;
  showEspecialidadesPanel = false;
  showEmpleadosPanel = false;

  toggleSubMenu(menu: string) {
    this.showSubMenu[menu] = !this.showSubMenu[menu];
  }

  toggleUsuariosPanel() {
    this.showUsuariosPanel = !this.showUsuariosPanel;
    if (this.showUsuariosPanel) {
      this.showRolesPanel = false;
      this.showEspecialidadesPanel = false;
      this.showEmpleadosPanel = false;
    }
  }

  toggleRolesPanel() {
    this.showRolesPanel = !this.showRolesPanel;
    if (this.showRolesPanel) {
      this.showUsuariosPanel = false;
      this.showEspecialidadesPanel = false;
      this.showEmpleadosPanel = false;
    }
  }

  toggleEspecialidadesPanel() {
    this.showEspecialidadesPanel = !this.showEspecialidadesPanel;
    if (this.showEspecialidadesPanel) {
      this.showUsuariosPanel = false;
      this.showRolesPanel = false;
      this.showEmpleadosPanel = false;
    }
  }

  toggleEmpleadosPanel() {
    this.showEmpleadosPanel = !this.showEmpleadosPanel;
    if (this.showEmpleadosPanel) {
      this.showUsuariosPanel = false;
      this.showRolesPanel = false;
      this.showEspecialidadesPanel = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
}