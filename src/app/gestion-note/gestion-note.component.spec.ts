import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNoteComponent } from './gestion-note.component';

describe('GestionNoteComponent', () => {
  let component: GestionNoteComponent;
  let fixture: ComponentFixture<GestionNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionNoteComponent]
    });
    fixture = TestBed.createComponent(GestionNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
