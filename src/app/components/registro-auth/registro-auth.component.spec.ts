import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAuthComponent } from './registro-auth.component';

describe('RegistroAuthComponent', () => {
  let component: RegistroAuthComponent;
  let fixture: ComponentFixture<RegistroAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
