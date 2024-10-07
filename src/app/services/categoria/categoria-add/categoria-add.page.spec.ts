import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaAddPage } from './categoria-add.page';

describe('CategoriaAddPage', () => {
  let component: CategoriaAddPage;
  let fixture: ComponentFixture<CategoriaAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
