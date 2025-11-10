import { AfterViewInit, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { DialogPrivacy } from '../dialog-privacy/dialog-privacy';
import { DialogSettings } from '../dialog-settings/dialog-settings';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '../../services/translate-service';
import { SettingsService } from '../../services/settings-service';
import { QuickSettings } from '../quick-settings/quick-settings';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-auth-shell',
  imports: [CommonModule, QuickSettings, Login, Register, MatButtonModule, MatCardModule, Footer],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.scss',
})
export class AuthShell {
  settingsService: SettingsService = inject(SettingsService);
  translateService: TranslateService = inject(TranslateService);
  toggleViewTextSignIn = this.translateService.t('html.components.auth-shell.toggleViewSignin');
  toggleViewTextLogIn = this.translateService.t('html.components.auth-shell.toggleViewLogin');
  currentView: WritableSignal<'login' | 'register'> = signal<'login' | 'register'>('login');

  constructor(private dialog: MatDialog) {
    
  }

  toggleView() {
    this.currentView.update(v => (v === 'login' ? 'register' : 'login'));
    const container = document.querySelector('.auth-background');
    if (container) {
      container.classList.toggle('flipped');
    }
  }

  openPrivacyDialog() {
    this.dialog.open(DialogPrivacy, { width: '500px' });
  }

  openSettingsDialog() {
    this.dialog.open(DialogSettings, { width: '500px' });
  }
}
