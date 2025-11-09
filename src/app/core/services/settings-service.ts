import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TranslateService } from './translate-service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private translate: TranslateService = inject(TranslateService);
  private cookieName = 'app_settings';
  private expiryDays = 30;

  darkMode: WritableSignal<boolean> = signal(false);
  language: WritableSignal<string> = signal('es');
  theme: WritableSignal<string> = signal('default');

  constructor() {
    this.loadSettings();
  }

  private setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;`;
    this.loadSettings();
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  loadSettings() {
    const cookie = this.getCookie(this.cookieName);
    if (cookie) {
      try {
        const settings = JSON.parse(cookie);
        this.darkMode.set(settings.darkMode ?? false);
        this.language.set(settings.language ?? 'es');
        this.theme.set(settings.theme ?? 'default');

        this.translate.setLanguage(this.language());
        if (this.darkMode()) document.body.classList.toggle('dark-theme', this.darkMode());
      } catch (e) {
        console.warn('Error al parsear cookie de configuración', e);
      }
    }
  }
  
  toggleDarkMode(){
    this.darkMode.update((value) => !value); 
    document.body.classList.toggle('dark-theme', this.darkMode());
    this.saveSettings()
  }

  setLanguageCookie(lang: string){
    this.language.update((value) => (lang === 'en' || lang === 'es' || lang === 'de')? lang : value); 
    this.translate.setLanguage(this.language());
    this.saveSettings()
  }

  saveSettings() {
    const data = {
      darkMode: this.darkMode(),
      language: this.language(),
      theme: this.theme(),
    };
    this.setCookie(this.cookieName, JSON.stringify(data), this.expiryDays);
  }
}
