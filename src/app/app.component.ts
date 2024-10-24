import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule si usas enrutamiento

@Component({
  selector: 'app-root',
  standalone: true,  // Indica que este es un componente standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule]  // Importa el módulo de enrutamiento para utilizar router-outlet
})
export class AppComponent {
  title = 'HistoriaClinicaFront';
}
