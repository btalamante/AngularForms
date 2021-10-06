import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  /**
   * this.formBuilder.array utilizamos el formBuilder y específicamos que ahí crearon un arreglo de formularios
   * donde podemos tener controles y sus validaciones
   */
  miFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.formBuilder.array( [
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ], Validators.required ),
    // existencias: [, [Validators.required, Validators.min(0)]]
  });

  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

  get favoritosArr(){
    /**
     * this.miFormulario.get('favoritos') as FormArray le estamos diciendo a Angular que this.miFormulario.get('favoritos') es un
     * FormArray
     */
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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

  campoEsValido(campo: string): boolean | null {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  agregarFavorito(){
    if (this.nuevoFavorito.invalid){
      return;
    }
    // this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.favoritosArr.push( this.formBuilder.control( this.nuevoFavorito.value, Validators.required ) );
    this.nuevoFavorito.reset();
  }

  borrar(control: number){
    this.favoritosArr.removeAt(control);
  }

}
