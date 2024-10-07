import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcaEditPage } from './marca-edit.page';

describe('MarcaEditPage', () => {
  let component: MarcaEditPage;
  let fixture: ComponentFixture<MarcaEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
