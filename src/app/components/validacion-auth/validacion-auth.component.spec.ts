import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionAuthComponent } from './validacion-auth.component';

describe('ValidacionAuthComponent', () => {
  let component: ValidacionAuthComponent;
  let fixture: ComponentFixture<ValidacionAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidacionAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
