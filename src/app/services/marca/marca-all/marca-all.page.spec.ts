import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcaAllPage } from './marca-all.page';

describe('MarcaAllPage', () => {
  let component: MarcaAllPage;
  let fixture: ComponentFixture<MarcaAllPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
