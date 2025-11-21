import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEditarComponent } from './seleccion-editar.component';

describe('SeleccionEditarComponent', () => {
  let component: SeleccionEditarComponent;
  let fixture: ComponentFixture<SeleccionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
