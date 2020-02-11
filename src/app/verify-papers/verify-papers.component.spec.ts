import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPapersComponent } from './verify-papers.component';

describe('VerifyPapersComponent', () => {
  let component: VerifyPapersComponent;
  let fixture: ComponentFixture<VerifyPapersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyPapersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
