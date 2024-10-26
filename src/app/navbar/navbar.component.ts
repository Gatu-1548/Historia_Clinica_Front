import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageUsuariosComponent } from '../administrador/manage-usuarios/manage-usuarios.component';
import { ManageRolesComponent } from '../administrador/manage-roles/manage-roles.component';
import { ManageEspecialidadesComponent } from '../registro/manage-especialidades/manage-especialidades.component';
import { ManageEmpleadosComponent } from '../personal/manage-empleados/manage-empleados.component';
import { PerfilComponent } from '../user/perfil/perfil.component'; // Importa el componente de perfil
import { ManagePermissionsComponent } from '../administrador/manage-permissions/manage-permissions.component'; // Importa el nuevo componente

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ManageUsuariosComponent,
    ManageRolesComponent,
    ManageEspecialidadesComponent,
    ManageEmpleadosComponent,
    PerfilComponent,
    ManagePermissionsComponent // Añade el componente de permisos
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showSubMenu: { [key: string]: boolean } = {
    admin: false,
    registros: false,
    personal: false,
  };
  showUsuariosPanel = false;
  showRolesPanel = false;
  showEspecialidadesPanel = false;
  showEmpleadosPanel = false;
  showProfilePanel = false; // Añade el panel de perfil
  showPermissionsPanel = false; // Añade el panel de permisos
  isUserMenuOpen = false;

  userName: string = ''; // Variable para almacenar el nombre del usuario

  ngOnInit() {
    // Recuperar los datos del usuario desde Session Storage
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userName = user.nombre || 'Usuario'; // Usar 'Usuario' si no hay un nombre
  }

  toggleSubMenu(menu: string) {
    this.showSubMenu[menu] = !this.showSubMenu[menu];
  }

  toggleUsuariosPanel() {
    this.showUsuariosPanel = !this.showUsuariosPanel;
    if (this.showUsuariosPanel) {
      this.resetPanels('usuarios');
    }
  }

  toggleRolesPanel() {
    this.showRolesPanel = !this.showRolesPanel;
    if (this.showRolesPanel) {
      this.resetPanels('roles');
    }
  }

  toggleEspecialidadesPanel() {
    this.showEspecialidadesPanel = !this.showEspecialidadesPanel;
    if (this.showEspecialidadesPanel) {
      this.resetPanels('especialidades');
    }
  }

  toggleEmpleadosPanel() {
    this.showEmpleadosPanel = !this.showEmpleadosPanel;
    if (this.showEmpleadosPanel) {
      this.resetPanels('empleados');
    }
  }

  togglePermissionsPanel() {
    this.showPermissionsPanel = !this.showPermissionsPanel;
    if (this.showPermissionsPanel) {
      this.resetPanels('permisos');
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  goToProfile() {
    this.showProfilePanel = !this.showProfilePanel;
    if (this.showProfilePanel) {
      this.resetPanels('perfil');
    }
    this.isUserMenuOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear(); // Limpiar todos los datos de la sesión
    window.location.href = '/';
  }

  private resetPanels(except: string) {
    this.showUsuariosPanel = except === 'usuarios';
    this.showRolesPanel = except === 'roles';
    this.showEspecialidadesPanel = except === 'especialidades';
    this.showEmpleadosPanel = except === 'empleados';
    this.showProfilePanel = except === 'perfil';
    this.showPermissionsPanel = except === 'permisos'; // Nuevo para permisos
  }
}