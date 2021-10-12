import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    /**
     * condiciones: [false, Validators.requiredTrue] validador para que deba ser TRUE
     */
    condiciones: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: false
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.miFormulario.setValue(this.persona);
    this.miFormulario.reset({
      ...this.persona,
      condiciones: true
    });

    /**
     * Podemos subscribirnos a los cambios del formulario mediante observables,
     * en la primera opción podemos subscribirnos a cambios de un elemento en particular
     * en la segunda, nos subscribirmos a cualquier cambio de cualquier elemento del formulario
     */
    // this.miFormulario.get('condiciones')?.valueChanges.subscribe(
    //   (form) => {
    //     console.log(form);
    //   }
    // );

    this.miFormulario.valueChanges.subscribe(
      ({condiciones, ...restoDeArgumentos}) => {
        /**
         * Con delete quitamos del form las condiciones para poder asignarlas a la propiedad de persona 
         * ya que persona no tiene definido condiciones
         */
        //delete form.condiciones;

        /**
         * Utilizamos la desestructuración para poder quitar condiciones y solamente
         * usar el operador rest en "restoDeArgumentos", entonces restoDeArgumentos no tendrá "condiciones" dentro
         */
        this.persona = restoDeArgumentos;
      }
    );

  }

  guardar() {
    /**
     * Este primer acercamiento lo que hace es que asigna los valores del formulario a la propiedad persona
     * solo hasta que se hace clic en el botón guardar
     */
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    this.persona = formValue;
  }

}
