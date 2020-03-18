import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRunInfoComponent } from './show-run-info.component';

describe('ShowRunInfoComponent', () => {
  let component: ShowRunInfoComponent;
  let fixture: ComponentFixture<ShowRunInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRunInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRunInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
