import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormsModule } from '@angular/forms'; // Importa FormsModule;
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-permissions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.css']
})
export class ManagePermissionsComponent implements OnInit {
  roles: any[] = [];
  permissions: any[] = [];
  selectedRoleId: number | null = null;
  rolePermissions: number[] = [];
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {
    this.form = this.fb.group({
      selectedRole: [null],
      permissions: [[]]
    });
  }

  ngOnInit(): void {
    this.loadRolesAndPermissions();
  }

  loadRolesAndPermissions(): void {
    // Cargar roles
    this.apiService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        this.notification.error('Error', 'No se pudieron cargar los roles');
      }
    );

    // Cargar permisos
    this.apiService.getPermissions().subscribe(
      (data) => {
        this.permissions = data;
      },
      (error) => {
        this.notification.error('Error', 'No se pudieron cargar los permisos');
      }
    );
  }

  onRoleChange(): void {
    if (this.selectedRoleId) {
      this.apiService.getRolePermissions(this.selectedRoleId).subscribe(
        (data) => {
          // Revisar si 'data.permisos' tiene la estructura correcta
          if (data && data.permisos) {
            this.rolePermissions = data.permisos.map((p: any) => p.id);
          } else {
            this.rolePermissions = [];
          }
        },
        (error) => {
          this.notification.error('Error', 'No se pudieron cargar los permisos del rol seleccionado');
        }
      );
    } else {
      this.rolePermissions = [];
    }
  }

  togglePermission(permissionId: number): void {
    // Alternar el estado del permiso
    if (this.rolePermissions.includes(permissionId)) {
      this.rolePermissions = this.rolePermissions.filter((id) => id !== permissionId);
    } else {
      this.rolePermissions.push(permissionId);
    }
  }

  savePermissions(): void {
    // Guardar permisos del rol seleccionado
    if (!this.selectedRoleId) {
      this.notification.error('Error', 'Por favor, selecciona un rol.');
      return;
    }
  
    // Asegurarse de que el ID sea un número y no un string
    const selectedRole = this.roles.find(role => role.id === Number(this.selectedRoleId));
    
    console.log("Selected Role ID:", this.selectedRoleId);
    console.log("Selected Role:", selectedRole);
  
    if (!selectedRole) {
      this.notification.error('Error', 'No se pudo encontrar el rol seleccionado.');
      return;
    }
  
    const payload = {
      nombre: selectedRole.nombre,
      permisos: this.rolePermissions.map(id => ({ id }))
    };
  
    this.apiService.updateRolePermissions(this.selectedRoleId, payload).subscribe(
      () => {
        this.notification.success('Éxito', 'Permisos actualizados correctamente');
      },
      (error) => {
        console.error('Error en la actualización de permisos:', error);
        this.notification.error('Error', 'No se pudieron actualizar los permisos');
      }
    );
  }
}