import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatedFormGroupComponent } from './validated-form-group.component';

describe('ValidatedFormGroupComponent', () => {
  let component: ValidatedFormGroupComponent;
  let fixture: ComponentFixture<ValidatedFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatedFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatedFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
