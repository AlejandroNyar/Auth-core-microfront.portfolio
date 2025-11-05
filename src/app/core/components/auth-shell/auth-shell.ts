import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Register } from '../register/register';
import { Login } from '../login/login';

@Component({
  selector: 'app-auth-shell',
  imports: [CommonModule, Login, Register, MatButtonModule, MatCardModule],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.scss'
})
export class AuthShell {
  currentView = signal<'login' | 'register'>('login');

  toggleView() {
    this.currentView.update(v => (v === 'login' ? 'register' : 'login'));
  }
}
