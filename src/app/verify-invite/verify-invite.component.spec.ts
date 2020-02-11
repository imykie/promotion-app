import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyInviteComponent } from './verify-invite.component';

describe('VerifyInviteComponent', () => {
  let component: VerifyInviteComponent;
  let fixture: ComponentFixture<VerifyInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
