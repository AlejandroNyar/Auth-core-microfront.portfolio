import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador que compara dos campos de contraseña.
 * @param passwordKey - Nombre del control de la contraseña principal
 * @param confirmPasswordKey - Nombre del control de confirmación
 * @returns ValidatorFn
 */
export function matchPasswordValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmPasswordKey)?.value;

    if (password !== confirmPassword) {
      group.get(confirmPasswordKey)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Limpia el error si las contraseñas coinciden
      const errors = group.get(confirmPasswordKey)?.errors;
      if (errors) {
        delete errors['passwordMismatch'];
        if (Object.keys(errors).length === 0) {
          group.get(confirmPasswordKey)?.setErrors(null);
        }
      }
      return null;
    }
  };
}