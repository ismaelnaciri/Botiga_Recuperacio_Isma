import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProducteComponent } from './crear-producte.component';

describe('CrearProducteComponent', () => {
  let component: CrearProducteComponent;
  let fixture: ComponentFixture<CrearProducteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProducteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProducteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
