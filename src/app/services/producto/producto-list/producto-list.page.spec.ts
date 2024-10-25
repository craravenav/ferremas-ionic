import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoListPage } from './producto-list.page';

describe('ProductoListPage', () => {
  let component: ProductoListPage;
  let fixture: ComponentFixture<ProductoListPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ProductoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
