import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcaAddPage } from './marca-add.page';

describe('MarcaAddPage', () => {
  let component: MarcaAddPage;
  let fixture: ComponentFixture<MarcaAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
