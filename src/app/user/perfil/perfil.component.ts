import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  // id: number = 1;
  // ci: string = '123456789';
  // nombre: string = 'Juan';
  // apellido_paterno: string = 'Pérez';
  // apellido_materno: string = 'González';
  // fecha_nacimiento: string = '1990-01-01';
  // username: string = 'juan.perez@gmail.com';
  // telefono: string = '1234567890';
  // role: string = 'PACIENTE';


  id: number | undefined;
  ci: string | undefined;
  nombre: string | undefined;
  apellido_paterno: string | undefined;
  apellido_materno: string | undefined;
  fecha_nacimiento: string | undefined;
  username: string | undefined;
  telefono: string | undefined;
  role: string | undefined;

  ngOnInit() {
    // Recuperar los datos del usuario directamente de Session Storage
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.id = user.id;
    this.ci = user.ci;
    this.nombre = user.nombre;
    this.apellido_paterno = user.apellido_paterno;
    this.apellido_materno = user.apellido_materno;
    this.fecha_nacimiento = user.fecha_nacimiento;
    this.username = user.username;
    this.telefono = user.telefono;
    this.role = user.role;
  }

}
