import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () => import('./core/components/auth-shell/auth-shell').then((m) => m.AuthShell),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
