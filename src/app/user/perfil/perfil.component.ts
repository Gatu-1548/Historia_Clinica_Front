import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  id: number = 1;
  ci: string = '123456789';
  nombre: string = 'Juan';
  apellido_paterno: string = 'Pérez';
  apellido_materno: string = 'González';
  fecha_nacimiento: string = '1990-01-01';
  username: string = 'juan.perez@gmail.com';
  telefono: string = '1234567890';
  role: string = 'PACIENTE';
}
