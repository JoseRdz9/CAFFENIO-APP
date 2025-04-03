import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { EmpleadosService } from '../common/services/empleados.service';
import { AuthService } from '../common/services/auth.service';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-micuenta',
  standalone: true,
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.scss'],
  imports: [CommonModule],
})
export class MicuentaComponent implements OnInit {
  empleado$: Observable<any> | null = null;
  modoClaro: boolean = false;
  cargando: boolean = true;

  constructor(
    private empleadosService: EmpleadosService,
    private authService: AuthService,
    private router: Router // Inyectar Router aquí
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
            shareReplay(1)
          );
        }
        return [];
      }),
      tap(() => this.cargando = false)
    );
  }

  volverAInicio() {
    this.router.navigate(['/tabs/home']); // Redirigir a la ruta principal
  }

  toggleModoClaro() {
    this.modoClaro = !this.modoClaro;
  }

  cerrarSesion() {
    this.authService.signOut().subscribe(() => {});
  }
}
