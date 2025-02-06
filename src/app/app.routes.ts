import { Routes } from '@angular/router';
import { DbConnectionComponent } from './db-connection/db-connection.component';  // Asegúrate de que la ruta sea correcta

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
    path: 'db-connection',  // URL segment
    component: DbConnectionComponent  // Componente que se debe cargar
  }
];
