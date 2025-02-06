import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevisionFechasPage } from './revision-fechas.page';

describe('RevisionFechasPage', () => {
  let component: RevisionFechasPage;
  let fixture: ComponentFixture<RevisionFechasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionFechasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
