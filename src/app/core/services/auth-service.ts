import { inject, Injectable } from '@angular/core';
import {
  Auth,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable, of } from 'rxjs';
import { SettingsService } from './settings-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private settingService = inject(SettingsService);

  constructor() {
  }

  async login(
    email: string,
    password: string,
    rememberMe: boolean = false
  ): Promise<UserCredential> {
    const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;

    await setPersistence(this.auth, persistence);
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<UserCredential> {
    const persistence = this.settingService.rememberMe()
      ? browserLocalPersistence
      : browserSessionPersistence;

    await setPersistence(this.auth, persistence);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await signInWithPopup(this.auth, provider);
    return userCredential;
  }

  checkUserActive(){
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        console.log('Usuario autenticado:', user.email);
      } else {
        console.log('No autenticado');
      }
    });
  }

  /** Cierra sesión */
  logout(): Observable<void> {
    return from(this.auth.signOut());
  }

  get user() {
    return this.auth.currentUser;
  }
}
