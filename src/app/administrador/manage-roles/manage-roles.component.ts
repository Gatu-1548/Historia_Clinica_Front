import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  roles: any[] = [];
  newRoleName: string = '';
  editedRole: any = null;
  editRoleName: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.apiService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  // Crear un nuevo rol
  createRole() {
    const newRole = { nombre: this.newRoleName };
    this.apiService.createRole(newRole).subscribe(() => {
      this.loadRoles();
      this.newRoleName = '';
    });
  }

  // Editar rol
  editRole(role: any) {
    this.editedRole = role;
    this.editRoleName = role.nombre;
  }

  // Guardar cambios
  saveRole() {
    if (this.editedRole) {
      const updatedRole = { nombre: this.editRoleName };
      this.apiService.updateRole(this.editedRole.id, updatedRole).subscribe(() => {
        this.loadRoles();
        this.cancelEdit();
      });
    }
  }

  // Cancelar edición
  cancelEdit() {
    this.editedRole = null;
    this.editRoleName = '';
  }

  // Eliminar rol
  deleteRole(roleId: number) {
    this.apiService.deleteRole(roleId).subscribe(() => {
      this.loadRoles();
    });
  }
}