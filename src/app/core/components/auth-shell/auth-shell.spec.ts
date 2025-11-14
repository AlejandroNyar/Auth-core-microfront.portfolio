import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthShell } from './auth-shell';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthShell', () => {
  let component: AuthShell;
  let fixture: ComponentFixture<AuthShell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthShell],
      providers: [provideZonelessChangeDetection(),
        provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthShell);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
