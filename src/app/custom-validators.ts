// src/app/custom-validators.ts
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function customPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value;

    if (!password) {
      return null; // No valida si el campo está vacío
    }

    // Contadores
    const numberCount = (password.match(/\d/g) || []).length;
    const letterCount = (password.match(/[a-z]/gi) || []).length;
    const uppercaseCount = (password.match(/[A-Z]/g) || []).length;

    // Validaciones
    const isValid =
      numberCount >= 4 &&
      letterCount >= 3 &&
      uppercaseCount >= 1;

    return isValid ? null : { 'customPassword': true };
  };
}