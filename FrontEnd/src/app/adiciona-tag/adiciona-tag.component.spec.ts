import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionaTagComponent } from './adiciona-tag.component';

describe('AdicionaTagComponent', () => {
  let component: AdicionaTagComponent;
  let fixture: ComponentFixture<AdicionaTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionaTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionaTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
