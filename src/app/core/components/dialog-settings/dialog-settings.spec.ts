import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSettings } from './dialog-settings';

describe('DialogSettings', () => {
  let component: DialogSettings;
  let fixture: ComponentFixture<DialogSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
