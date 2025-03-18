<<<<<<< HEAD
import { Routes } from '@angular/router';
// import { DbConnectionComponent } from './db-connection/db-connection.component';  // Asegúrate de que la ruta sea correcta

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'revision-fechas',
    loadComponent: () => import('./revision-fechas/revision-fechas.page').then(m => m.RevisionFechasPage)
  },  {
    path: 'tareas-pendientes',
    loadComponent: () => import('./tareas-pendientes/tareas-pendientes.page').then( m => m.TareasPendientesPage)
  }

]
=======
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',  // Ruta principal para redirigir a los tabs
    redirectTo: 'login',  // Redirige a login si no hay sesión activa
    pathMatch: 'full',
  },
  {
    path: 'login',  // Ruta de login
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'tabs',  // Carga el componente de los tabs
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'home', // Ruta para el tab home
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'micuenta', // Ruta para el tab micuenta
        loadComponent: () =>
          import('./micuenta/micuenta.component').then((m) => m.MicuentaComponent),
      },
      {
        path: '',
        redirectTo: 'home', // Redirige por defecto a 'home' en los tabs
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'revision-fechas',
    loadComponent: () => import('./revision-fechas/revision-fechas.page').then(m => m.RevisionFechasPage),
  },
  {
    path: 'micuenta',
    loadComponent: () => import('./micuenta/micuenta.component').then(m => m.MicuentaComponent),
  },
  {
    path: 'admin-control',
    loadComponent: () => import('./admin-control/admin-control.component').then(m => m.AdminControlComponent ),
  }
];
>>>>>>> 92fdfbba95988698c0df2f9a8f03b2fd89f0c7c4
