import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaCartaoComponent } from './adiciona-cartao.component';

describe('AdicionaCartaoComponent', () => {
  let component: AdicionaCartaoComponent;
  let fixture: ComponentFixture<AdicionaCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaCartaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
