import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';  // Importa el guard
import { ManageUsuariosComponent } from './administrador/manage-usuarios/manage-usuarios.component';
import { ManageRolesComponent } from './administrador/manage-roles/manage-roles.component'; // Asegúrate de tener este componente creado
import { ManageEspecialidadesComponent } from './registro/manage-especialidades/manage-especialidades.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { ManagePermissionsComponent } from './administrador/manage-permissions/manage-permissions.component'; // Añadir importación

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Protege esta ruta con el guard
  { path: 'manage-usuarios', component: ManageUsuariosComponent },
  { path: 'gestionar-roles', component: ManageRolesComponent },
  { path: 'gestionar-especialidades', component: ManageEspecialidadesComponent },
  { path: 'perfil', component: PerfilComponent }, // Ruta para el perfil
  { path: 'gestionar-permisos', component: ManagePermissionsComponent }, // Nueva ruta para permisos
];