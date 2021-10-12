import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor() { }

  noPuedeSerStrider: ValidationErrors | null = (control: FormControl) => {
    const valor = control.value?.trim().toLowerCase();
    if (valor === 'strider') {
      return {
        noStrider: true
      }
    }
    return null;
  }

  camposIguales(campo1: string, campo2: string): ValidationErrors | null {
    /**
     * Tenemos que regresar una nueva función
     * formGroup es la representación de nuestro formulario
     */
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return {
          noIguales: true
        }
      }
      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }
}
