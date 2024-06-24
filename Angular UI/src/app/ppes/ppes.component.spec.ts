import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpesComponent } from './ppes.component';

describe('PpesComponent', () => {
  let component: PpesComponent;
  let fixture: ComponentFixture<PpesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PpesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PpesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
