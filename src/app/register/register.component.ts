import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, FormsModule]
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

  isControlInvalid(form: NgForm, controlName: string): boolean {
    const control = form.controls[controlName];
    return control?.invalid && control?.touched;
  }

  onRegister(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    console.log('Datos enviados:', this.userData);
    this.apiService.register(this.userData).subscribe(response => {
      console.log('Usuario registrado:', response);
      this.router.navigate(['/']);
    }, error => {
      console.error('Error en el registro:', error);
    });
  }
}

//jorge@gmail.com 456