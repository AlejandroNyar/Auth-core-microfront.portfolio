import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrivacy } from './dialog-privacy';

describe('DialogPrivacy', () => {
  let component: DialogPrivacy;
  let fixture: ComponentFixture<DialogPrivacy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPrivacy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrivacy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
