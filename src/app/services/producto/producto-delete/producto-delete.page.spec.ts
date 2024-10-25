import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoDeletePage } from './producto-delete.page';

describe('ProductoDeletePage', () => {
  let component: ProductoDeletePage;
  let fixture: ComponentFixture<ProductoDeletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
