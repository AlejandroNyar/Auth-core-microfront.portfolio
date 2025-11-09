import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from '../../services/auth';
import { TranslateService } from '../../services/translate-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  translate = inject(TranslateService);

  loading = false;
  errorMessage = '';
  successMessage = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.form.value;

    try {
      // Utilizamos directamente createUserWithEmailAndPassword
      await createUserWithEmailAndPassword(this.auth['auth'], email!, password!);
      this.successMessage = this.translate.t("success.register.registerSuccess").toString();
      this.form.reset();
    } catch (err: any) {
      this.errorMessage = this.translate.t("html.errors.register") + err.message;
    } finally {
      this.loading = false;
    }
  }
}
