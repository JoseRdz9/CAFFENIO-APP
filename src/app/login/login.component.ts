import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js'; // Asegúrate de importar correctamente

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule]  // Asegúrate de importar FormsModule aquí
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Login attempt for:', this.email);  // Agrega un log para ver si se está llamando al método

    this.authService.login(this.email, this.password).subscribe(
      (result) => {
        console.log('Login successful', result);
        this.router.navigate(['/tabs']); // Redirige a la página principal después del login exitoso
      },
      (error) => {
        console.error('Login failed', error);

        // Verifica si esta parte del código se ejecuta
        if (error) {
          console.log('Displaying toast notification');
          // Muestra la notificación si hay un error
          new Toastify({
            text: "Correo o contraseña incorrectos",
            backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",  // Color de fondo
            duration: 3000,  // Duración del toast (en ms)
            close: true,  // Habilitar cierre del toast
            gravity: "top",  // Muestra el toast en la parte superior
            position: "right",  // Muestra el toast en la parte derecha
            stopOnFocus: true  // Detiene el toast cuando el usuario lo toca
          }).showToast();
        }
      }
    );
  }
}
