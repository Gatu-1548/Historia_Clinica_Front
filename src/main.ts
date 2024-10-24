import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Usa provideHttpClient
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Importa las rutas desde app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]  // Usa provideHttpClient y las rutas de app.routes.ts
})
  .catch(err => console.error(err));