import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCartaoComponent } from './cadastro-cartao.component';

describe('CadastroCartaoComponent', () => {
  let component: CadastroCartaoComponent;
  let fixture: ComponentFixture<CadastroCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
