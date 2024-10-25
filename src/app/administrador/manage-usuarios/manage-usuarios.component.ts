import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';  // Ajusta la ruta de tu ApiService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Para usar [(ngModel)]

@Component({
  selector: 'app-manage-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-usuarios.component.html',
  styleUrls: ['./manage-usuarios.component.css']
})
export class ManageUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuariosPaginados: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.apiService.getUsuarios().subscribe(
      (data: any) => {
        this.usuarios = data;
        this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
        this.updatePaginatedUsers();
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  // Función de búsqueda
  filterUsuarios() {
    const filteredUsuarios = this.usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.ci.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      usuario.apellido_paterno.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredUsuarios.length / this.itemsPerPage);
    this.currentPage = 1;
    this.usuariosPaginados = filteredUsuarios.slice(0, this.itemsPerPage);
  }

  // Funciones de paginación
  updatePaginatedUsers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.usuariosPaginados = this.usuarios.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsers();
    }
  }
}