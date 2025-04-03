import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../common/services/auth.service';  // Asegúrate de tener el servicio en tu test si es necesario

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        IonicModule,
        RouterTestingModule,  // Importa RouterTestingModule para probar la navegación
        FormsModule  // Importa FormsModule para que ngModel funcione
      ],
      providers: [AuthService]  // Asegúrate de tener el servicio disponible si es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});