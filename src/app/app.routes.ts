import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',  // Ruta principal para redirigir a los tabs
    redirectTo: 'tabs/home',  // Redirige a los tabs, específicamente al tab home
    pathMatch: 'full',
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
  }
];
