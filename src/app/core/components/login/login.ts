import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateService } from '../../services/translate-service';
import { SettingsService } from '../../services/settings-service';

@Component({
  selector: 'app-login',
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private settingService: SettingsService = inject(SettingsService)
  translateService = inject(TranslateService);


  loading = false;
  errorMessage = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [this.settingService.rememberMe()]
  });

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.form.value;

    try {
      if (this.settingService.rememberMe()) {
        // TODO: Guardar token más largo o marcar cookie persistente 
      }
      await this.auth.login(email!, password!, this.settingService.rememberMe() ?? false);
      console.log('Login exitoso');
      //TODO: redirigir o enviar evento a otro microfrontend
    } catch (err: any) {
      this.errorMessage = this.translateService.t("html.errors.login") + err.message;
    } finally {
      this.loading = false;
    }
  }

  setRememberMe(){
    const { rememberMe } = this.form.value;
    this.settingService.setRememberMe(rememberMe ?? false)
  }

  async onGoogleLogin() {
    await this.auth.loginWithGoogle().then((cred) => {
      try {
        console.log('Usuario autenticado con Google:', cred.user);
      } catch (err) {
        console.error('Error al iniciar sesión con Google:', err);
      }
    });
  }
}
