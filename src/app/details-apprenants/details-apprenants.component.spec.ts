import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsApprenantsComponent } from './details-apprenants.component';

describe('DetailsApprenantsComponent', () => {
  let component: DetailsApprenantsComponent;
  let fixture: ComponentFixture<DetailsApprenantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsApprenantsComponent]
    });
    fixture = TestBed.createComponent(DetailsApprenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
