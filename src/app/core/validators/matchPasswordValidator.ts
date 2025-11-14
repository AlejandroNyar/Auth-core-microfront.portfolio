import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @param passwordKey - control Password Input
 * @param confirmPasswordKey - Comparate Pasword Input
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