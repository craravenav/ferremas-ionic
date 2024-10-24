import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service'; // Importa el servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController // Inyecta el controlador de alertas
  ) {
    // Definimos el formulario de login
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]] // Define los controles con los nombres correspondientes
    });
  }

  // Método para manejar el inicio de sesión
  async login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const valido = await this.authService.validarUsuario(formData.Email, formData.Password);
      
      if (valido) {
        // Navegar a la página de tienda si el usuario es válido
        this.router.navigate(['/tienda']);
      } else {
        // Mostrar alerta si la autenticación falla
        await this.showErrorAlert('Correo o contraseña incorrectos. Por favor, verifica tus credenciales.');
      }
    } else {
      // Mostrar alerta si los campos del formulario son inválidos
      await this.showErrorAlert('Por favor, completa todos los campos correctamente.');
    }
  }

  // Función para mostrar una alerta de error
  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Inicio de Sesión',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
