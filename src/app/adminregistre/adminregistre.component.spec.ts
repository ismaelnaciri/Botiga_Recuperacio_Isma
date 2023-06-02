import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminregistreComponent } from './adminregistre.component';

describe('AdminregistreComponent', () => {
  let component: AdminregistreComponent;
  let fixture: ComponentFixture<AdminregistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminregistreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminregistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
