import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private translations = signal<Record<string, any>>({});
  private currentLang = signal<string>('en');

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang());
  }

  private loadTranslations(lang: string): void {
    this.http
      .get<Record<string, any>>(`assets/i18n/${lang}.json`)
      .pipe(
        tap((data) => {
          this.translations.set(data);
          this.currentLang.set(lang);
        }),
        catchError((error) => {
          console.error(`${this.t("errors.translate")} ${lang}:`, error);
          return of({});
        })
      )
      .subscribe();
  }

  /** Cambia el idioma y recarga las traducciones */
  setLanguage(lang: string): void {
    if (lang !== this.currentLang()) {
      this.loadTranslations(lang);
    }
  }

  getLanguage(): string {
    return this.currentLang();
  }

  /** Devuelve un Signal que reacciona automáticamente al idioma actual */
  t(key: string) {
    return computed(() => {
      const dict = this.translations();
      const value = this.getNestedValue(dict, key);
      return value ?? key;
    });
  }

  /** Búsqueda anidada tipo "a.b.c" */
  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }
}