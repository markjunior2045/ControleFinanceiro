import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCartaoDialogComponent } from './detalhes-cartao-dialog.component';

describe('DetalhesCartaoDialogComponent', () => {
  let component: DetalhesCartaoDialogComponent;
  let fixture: ComponentFixture<DetalhesCartaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesCartaoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesCartaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
