import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'revision-fechas',
    loadComponent: () => import('./revision-fechas/revision-fechas.page').then(m => m.RevisionFechasPage)
  },
  {
    path: 'micuenta',
    loadComponent: () => import('./micuenta/micuenta.component').then(m => m.MicuentaComponent)
  },
  {
    path: 'login',  // Nueva ruta para el login
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  }
];
