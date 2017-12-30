import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHostComponent } from './main-host.component';

describe('MainHostComponent', () => {
  let component: MainHostComponent;
  let fixture: ComponentFixture<MainHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
