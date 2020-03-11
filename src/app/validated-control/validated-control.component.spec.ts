import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedControlComponent } from './validated-control.component';

describe('ValidatedControlComponent', () => {
  let component: ValidatedControlComponent;
  let fixture: ComponentFixture<ValidatedControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatedControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
