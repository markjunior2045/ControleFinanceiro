import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesContaCorrenteDialogComponent } from './detalhes-conta-corrente-dialog.component';

describe('DetalhesContaCorrenteDialogComponent', () => {
  let component: DetalhesContaCorrenteDialogComponent;
  let fixture: ComponentFixture<DetalhesContaCorrenteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesContaCorrenteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesContaCorrenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
