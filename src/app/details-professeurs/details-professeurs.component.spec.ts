import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProfesseursComponent } from './details-professeurs.component';

describe('DetailsProfesseursComponent', () => {
  let component: DetailsProfesseursComponent;
  let fixture: ComponentFixture<DetailsProfesseursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsProfesseursComponent]
    });
    fixture = TestBed.createComponent(DetailsProfesseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
