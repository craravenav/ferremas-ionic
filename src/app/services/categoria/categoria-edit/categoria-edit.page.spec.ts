import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaEditPage } from './categoria-edit.page';

describe('CategoriaEditPage', () => {
  let component: CategoriaEditPage;
  let fixture: ComponentFixture<CategoriaEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
