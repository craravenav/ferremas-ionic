import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoAllPage } from './producto-all.page';

describe('ProductoAllPage', () => {
  let component: ProductoAllPage;
  let fixture: ComponentFixture<ProductoAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
