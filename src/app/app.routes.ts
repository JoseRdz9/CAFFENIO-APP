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
        path: '',  // Redirige por defecto a 'home' en los tabs
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'micuenta', // Ruta fuera de los tabs para mostrar el componente de perfil sin los tabs
    loadComponent: () => import('./micuenta/micuenta.component').then(m => m.MicuentaComponent),
  },
  {
    path: 'revision-fechas',
    loadComponent: () => import('./revision-fechas/revision-fechas.page').then(m => m.RevisionFechasPage),
  },
  {
    path: 'admin-control',
    loadComponent: () => import('./admin-control/admin-control.component').then(m => m.AdminControlComponent ),
  }
];
