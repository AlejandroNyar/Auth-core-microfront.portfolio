import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailValidation } from './mail-validation';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MailValidation', () => {
  let component: MailValidation;
  let fixture: ComponentFixture<MailValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailValidation],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailValidation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
