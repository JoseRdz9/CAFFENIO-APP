import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';


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
    console.log('Login attempt for:', this.email);  // Log para verificar si el método se ejecuta
  
    this.authService.login(this.email, this.password).subscribe(
      (result) => {
        console.log('Login successful', result);
        this.router.navigate(['/tabs/home']); // Redirige al home si es exitoso
      },
      (error) => {
        console.error('Login failed', error);
        
        // Crear una nueva instancia de Toastify sin la propiedad `style`
        new Toastify({
          text: "Correo o contraseña incorrectos",
          duration: 3000,
          gravity: "top", // "top" o "bottom"
          position: "right", // "left", "center", "right"
          backgroundColor: "#dc1436"
        }).showToast();
      }
    );
  }
  
  }