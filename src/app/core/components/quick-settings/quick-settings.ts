import { Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSettings } from '../dialog-settings/dialog-settings';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quick-settings',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './quick-settings.html',
  styleUrl: './quick-settings.scss',
})
export class QuickSettings {
  isOpen = signal(false);
  darkMode = signal(false);
  language = signal('en');

  constructor(private dialog: MatDialog) {}

  togglePanel() {
    this.isOpen.update((v) => !v);
  }

  toggleDarkMode(event: any) {
    this.darkMode.set(event.checked);
    document.body.classList.toggle('dark-theme', this.darkMode());
  }

  changeLanguage(lang: string) {
    //this.language.set(lang);
    console.log('Setted Lang');
  }

  openSettingsDialog() {
    this.dialog.open(DialogSettings, { width: '400px' });
  }
}
