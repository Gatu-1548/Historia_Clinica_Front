import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa el Router para redirigir
import { ApiService } from '../api.service';  // Importa el servicio
import { FormsModule } from '@angular/forms';  // Importa FormsModule para ngModel

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule]  // Solo FormsModule es necesario aquí para ngModel
})
export class RegisterComponent {

  userData = {
    ci: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    username: '',
    password: '',
    telefono: '',
    genero: ''
  };

  constructor(private apiService: ApiService, private router: Router) { }

  onRegister() {
    console.log('Datos enviados:', this.userData);  // Para verificar que los datos están siendo enviados

    this.apiService.register(this.userData).subscribe(response => {
      console.log('Usuario registrado:', response);
      this.router.navigate(['/']);  // Redirige al home después del registro
    }, error => {
      console.error('Error en el registro:', error);
    });
  }
}
//jorge@gmail.com 456