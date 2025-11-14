import { AuthService } from './auth-service';
import { SettingsService } from './settings-service';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuth: any;
  let mockSettings: jasmine.SpyObj<SettingsService>;

  beforeEach(() => {
    mockAuth = {
      currentUser: null,
      signOut: jasmine.createSpy().and.returnValue(Promise.resolve()),
    };

    mockSettings = jasmine.createSpyObj('SettingsService', ['rememberMe'], {
      rememberMe: () => false,
    });

    service = new AuthService();
    (service as any).auth = mockAuth;
    (service as any).settingService = mockSettings;
  });

  it('debería devolver el usuario actual', () => {
    mockAuth.currentUser = { email: 'test@mail.com' } as any;
    expect(service.user?.email).toBe('test@mail.com');
  });

  it('debería cerrar sesión correctamente', (done) => {
    service.logout().subscribe(() => {
      expect(mockAuth.signOut).toHaveBeenCalled();
      done();
    });
  });
});
