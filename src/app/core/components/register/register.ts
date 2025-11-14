import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth-service';
import { TranslateService } from '../../services/translate-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogPrivacy } from '../dialog-privacy/dialog-privacy';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { matchPasswordValidator } from '../../validators/matchPasswordValidator';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  translateService = inject(TranslateService);

  loading = false;
  errorMessage = '';
  successMessage = '';
  errorPrivacyDisplay = false;

  constructor(private dialog: MatDialog) {}

  form = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    },
    { validators: matchPasswordValidator('password', 'repeatPassword') }
  );

  onPrivacyChange() {
    this.errorPrivacyDisplay = true;
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.form.value;

    try {
      await createUserWithEmailAndPassword(this.auth['auth'], email!, password!);
      this.successMessage = this.translateService.t('success.register.registerSuccess').toString();
      this.form.reset();
    } catch (err: any) {
      this.errorMessage = this.translateService.t('html.errors.register') + err.message;
    } finally {
      this.loading = false;
    }
  }

  openPrivacyDialog() {
    this.dialog.open(DialogPrivacy, { width: '500px' });
  }

  async onGoogleSignup() {
    await this.auth.loginWithGoogle().then((cred) => {
      try {
        console.log('Usuario autenticado con Google:', cred.user);
      } catch (err) {
        console.error('Error al iniciar sesión con Google:', err);
      }
    });
  }
}
