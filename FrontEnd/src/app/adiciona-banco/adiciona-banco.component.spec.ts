import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaBancoComponent } from './adiciona-banco.component';

describe('AdicionaBancoComponent', () => {
  let component: AdicionaBancoComponent;
  let fixture: ComponentFixture<AdicionaBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaBancoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
