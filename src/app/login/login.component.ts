import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { Router } from '@angular/router';


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
        this.router.navigate(['/tabs/home']); // Redirige a la página principal después del login exitoso
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
