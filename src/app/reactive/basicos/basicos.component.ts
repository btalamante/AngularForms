import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  /**
   * De esta forma se pueden crear los componentes
   */
  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5)
  // });

  /**
   * Con el FormBuilder tenemos la posibilidad de crear el FormGroup
   * Junto con sus componentes
   * Solamente hay que inyectar el FormBuilder
   * Se deben de declarar los componentes y entre corchetes:
   *  - Valor por default
   *  - Validadores síncronos (funciones de JS) si es mas de uno se puede poner como un arreglo
   *  - Validadores asíncronos (se puede ejecutar en otro hilo del tiempo)
   */
  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'RTX 4080ti',
      precio: 1600,
      existencias: 10
    })
  }

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      /**
       * markAllAsTouched() le indica a Angular que queremos que todos los campos
       * se marquen como manipulados para poder activar las validaciones.
       */
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    /**
     * Resetear el form a su estado inicial
     */
    this.miFormulario.reset();
  }

}
