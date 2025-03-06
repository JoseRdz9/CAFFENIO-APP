import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../common/services/empleados.service';
import { AuthService } from '../common/services/auth.service';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs'; 
import { switchMap, shareReplay, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-micuenta',
  standalone: true, // Especifica que el componente es standalone
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.scss'],
  imports: [CommonModule],  // Asegúrate de incluir CommonModule aquí
})
export class MicuentaComponent implements OnInit {
  empleado$: Observable<any> | null = null; // Cambié a un observable para optimizar las solicitudes
  modoClaro: boolean = false;
  cargando: boolean = true; // Variable para manejar el estado de carga

  constructor(
    private empleadosService: EmpleadosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.empleado$ = this.authService.getCurrentUser().pipe(
      switchMap((user: User | null) => {
        if (user) {
          return this.empleadosService.obtenerEmpleados().pipe(
            switchMap(empleados => {
              const empleadoLogueado = empleados.find(emp => emp.id === user.uid);
              return empleadoLogueado ? [empleadoLogueado] : [];
            }),
            shareReplay(1) // Evita hacer la solicitud más de una vez
          );
        }
        return [];
      }),
      tap(() => this.cargando = false) // Al completar, cambia el estado de 'cargando'
    );
  }

  toggleModoClaro() {
    this.modoClaro = !this.modoClaro;
    // Agrega lógica para aplicar el tema claro u oscuro
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.authService.signOut().subscribe(() => {
      // Puedes agregar algún mensaje o lógica adicional si es necesario
    });
  }
}
