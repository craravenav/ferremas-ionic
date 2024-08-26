import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      Nombre: ['', Validators.required],
      Apellido: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  // Función para manejar el registro
  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.router.navigate(['/login'], { queryParams: { registrationSuccess: 'true' }, queryParamsHandling: 'merge' });
    } else {
      console.log('Formulario no válido');
    }
  }
}
