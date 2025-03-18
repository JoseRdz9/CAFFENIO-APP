import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasPendientesPage } from './tareas-pendientes.page';

describe('TareasPendientesPage', () => {
  let component: TareasPendientesPage;
  let fixture: ComponentFixture<TareasPendientesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
