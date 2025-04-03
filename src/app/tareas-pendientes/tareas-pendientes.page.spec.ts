import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareasPendientesPage } from './tareas-pendientes.page';
import { FirebaseService } from '../common/services/firestore.service';
import { of } from 'rxjs';

describe('TareasPendientesPage', () => {
  let component: TareasPendientesPage;
  let fixture: ComponentFixture<TareasPendientesPage>;
  let firestoreServiceSpy: jasmine.SpyObj<FirebaseService>;

  beforeEach(async () => {
    firestoreServiceSpy = jasmine.createSpyObj('FirebaseService', ['getTasks', 'addTask', 'updateTaskStatus', 'deleteTask']);
    firestoreServiceSpy.getTasks.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [TareasPendientesPage],
      providers: [{ provide: FirebaseService, useValue: firestoreServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TareasPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
