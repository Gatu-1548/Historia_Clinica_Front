import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // Usa provideHttpClient
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(es);  // Importa las rutas desde app.routes.ts

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(), provideNzI18n(es_ES), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]  // Usa provideHttpClient y las rutas de app.routes.ts
})
  .catch(err => console.error(err));