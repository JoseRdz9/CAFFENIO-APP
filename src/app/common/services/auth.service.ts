import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';  // Importa Auth
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { User } from 'firebase/auth';  // Importa User de Firebase
import { tap } from 'rxjs/operators';  // Asegúrate de importar 'tap' aquí

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private router: Router) {}

  // Método para iniciar sesión
  // En tu servicio de autenticación (AuthService)
  login(email: string, password: string) {
    const authInstance = getAuth();
    return from(
      signInWithEmailAndPassword(authInstance, email, password).catch((error) => {
        throw error;  // Lanzamos el error para ser capturado en el componente
      })
    );
  }

  // Método para registrar un nuevo usuario
  register(email: string, password: string) {
    const authInstance = getAuth();
    return from(createUserWithEmailAndPassword(authInstance, email, password));
  }

  // Método para obtener el usuario actualmente logueado
  getCurrentUser(): Observable<User | null> {
    const authInstance = getAuth();
    return new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(authInstance, (user) => {
        observer.next(user);  // Emitimos el usuario logueado (o null si no está logueado)
      });

      // Cleanup (desuscribirse) cuando se complete la suscripción
      return () => unsubscribe();
    });
  }

  // Método para cerrar sesión
  signOut() {
    const authInstance = getAuth();
    return from(authInstance.signOut()).pipe(
      tap(() => {
        // Redirige a la página de login después de cerrar sesión
        this.router.navigate(['/login']);
      })
    );
  }
}
