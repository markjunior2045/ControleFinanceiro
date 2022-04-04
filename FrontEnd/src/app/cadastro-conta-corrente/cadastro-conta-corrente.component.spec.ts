import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroContaCorrenteComponent } from './cadastro-conta-corrente.component';

describe('CadastroContaCorrenteComponent', () => {
  let component: CadastroContaCorrenteComponent;
  let fixture: ComponentFixture<CadastroContaCorrenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroContaCorrenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroContaCorrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
