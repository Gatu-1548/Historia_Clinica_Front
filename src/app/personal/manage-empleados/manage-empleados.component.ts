import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-empleados.component.html',
  styleUrls: ['./manage-empleados.component.css']
})
export class ManageEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  empleadosPaginados: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  editedEmpleado: any = null;
  isModalOpen = false;

  editEmpleadoData: any = {
    estado: '',
    fechaContratacion: '',
    user: {
      ci: '',
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      telefono: '',
      email: ''
    },
    especialidades: []
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados() {
    this.apiService.getEmpleados().subscribe((data) => {
      this.empleados = data;
      this.paginateEmpleados();
    });
  }

  filterEmpleados() {
    const filtered = this.empleados.filter(empleado =>
      empleado.user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.paginateEmpleados(filtered);
  }

  paginateEmpleados(data = this.empleados) {
    this.totalPages = Math.ceil(data.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    this.empleadosPaginados = data.slice(start, start + this.pageSize);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateEmpleados();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateEmpleados();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  createEmpleado() {
    this.apiService.createEmpleado(this.editEmpleadoData).subscribe(() => {
      this.loadEmpleados();
      this.closeModal();
    });
  }

  editEmpleado(empleado: any) {
    this.editedEmpleado = empleado;
    this.editEmpleadoData.estado = empleado.estado;
    this.editEmpleadoData.fechaContratacion = empleado.fechaContratacion;
    this.editEmpleadoData.user = {
      ci: empleado.user.ci,
      nombre: empleado.user.nombre,
      apellido_paterno: empleado.user.apellido_paterno,
      apellido_materno: empleado.user.apellido_materno,
      telefono: empleado.user.telefono,
      email: empleado.user.email
    };
    this.isModalOpen = true;
  }

  saveEmpleado() {
    if (this.editedEmpleado) {
      this.apiService.updateEmpleado(this.editedEmpleado.id, this.editEmpleadoData).subscribe(() => {
        this.loadEmpleados();
        this.cancelEdit();
      });
    }
  }

  cancelEdit() {
    this.editedEmpleado = null;
    this.closeModal();
  }

  resetForm() {
    this.editEmpleadoData = {
      estado: '',
      fechaContratacion: '',
      user: {
        ci: '',
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        telefono: '',
        email: ''
      },
      especialidades: []
    };
  }

  autoFillForm(ci: string) {
    // Buscar el empleado que tiene el CI en la lista de empleados cargados
    const empleado = this.empleados.find((emp: any) => emp.user.ci === ci);
    
    // Si se encuentra el empleado, usa su ID para hacer una solicitud al backend y obtener sus detalles completos
    if (empleado) {
      this.apiService.getEmpleadoById(empleado.id).subscribe((data: any) => {
        this.editEmpleadoData.user = {
          ci: data.user.ci,
          nombre: data.user.nombre,
          apellido_paterno: data.user.apellido_paterno,
          apellido_materno: data.user.apellido_materno,
          telefono: data.user.telefono,
          email: data.user.username // Usar el campo 'username' para obtener el correo
        };
        this.editEmpleadoData.fechaContratacion = data.fechaContratacion;
        this.editEmpleadoData.estado = data.estado;
        this.editEmpleadoData.especialidades = data.especialidades.map((e: any) => e.id);
      }, (error: any) => {
        console.error("No se pudo obtener el empleado", error);
      });
    }
  }
}