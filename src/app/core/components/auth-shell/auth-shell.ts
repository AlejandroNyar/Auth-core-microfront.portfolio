import { AfterViewInit, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { DialogPrivacy } from '../dialog-privacy/dialog-privacy';
import { DialogSettings } from '../dialog-settings/dialog-settings';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '../../services/translate.service';
import { SettingsService } from '../../services/settings-service';

@Component({
  selector: 'app-auth-shell',
  imports: [CommonModule, Login, Register, MatButtonModule, MatCardModule],
  templateUrl: './auth-shell.html',
  styleUrl: './auth-shell.scss',
})
export class AuthShell{

  settingsService: SettingsService = inject(SettingsService); 
  translateService: TranslateService = inject(TranslateService);
  toggleViewText1 = this.translateService.t('html.components.auth-shell.toggleViewSignin');
  toggleViewText2 = this.translateService.t('html.components.auth-shell.toggleViewLogin');
  currentView: WritableSignal<'login' | 'register'> = signal<'login' | 'register'>('login');

  constructor(private dialog: MatDialog) {
    console.log(this.translateService.t('html.components.auth-shell.toggleViewSignin'))
  }

  toggleView() {
    this.currentView.update((v) => (v === 'login' ? 'register' : 'login'));
  }

  openPrivacyDialog() {
    this.dialog.open(DialogPrivacy, { width: '500px' });
  }

  openSettingsDialog() {
    this.dialog.open(DialogSettings, { width: '400px' });
  }
}
