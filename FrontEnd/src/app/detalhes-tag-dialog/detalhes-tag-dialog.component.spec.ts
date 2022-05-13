import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesTagDialogComponent } from './detalhes-tag-dialog.component';

describe('DetalhesTagDialogComponent', () => {
  let component: DetalhesTagDialogComponent;
  let fixture: ComponentFixture<DetalhesTagDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesTagDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesTagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
