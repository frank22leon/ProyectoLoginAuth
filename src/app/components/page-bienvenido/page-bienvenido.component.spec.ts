import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBienvenidoComponent } from './page-bienvenido.component';

describe('PageBienvenidoComponent', () => {
  let component: PageBienvenidoComponent;
  let fixture: ComponentFixture<PageBienvenidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageBienvenidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBienvenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
