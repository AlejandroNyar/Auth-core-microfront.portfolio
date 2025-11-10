import { Routes } from '@angular/router';
import { AuthShell } from './core/components/auth-shell/auth-shell';
import { Login } from './core/components/login/login';
import { Register } from './core/components/register/register';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthShell,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];