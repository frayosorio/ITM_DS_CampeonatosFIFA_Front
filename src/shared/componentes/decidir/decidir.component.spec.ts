import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecidirComponent } from './decidir.component';

describe('DecidirComponent', () => {
  let component: DecidirComponent;
  let fixture: ComponentFixture<DecidirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecidirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecidirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
