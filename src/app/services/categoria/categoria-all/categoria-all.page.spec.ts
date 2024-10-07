import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaAllPage } from './categoria-all.page';

describe('CategoriaAllPage', () => {
  let component: CategoriaAllPage;
  let fixture: ComponentFixture<CategoriaAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
