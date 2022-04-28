import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoContaComponent } from './gerenciamento-conta.component';

describe('GerenciamentoContaComponent', () => {
  let component: GerenciamentoContaComponent;
  let fixture: ComponentFixture<GerenciamentoContaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciamentoContaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
