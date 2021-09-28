import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  /**
   * Con esto podemos tener acceso a variables del HTML, en este caso es #miFormulario es decir el Form
   */
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initForm = {
    producto: 'RTX 4080 ti',
    precio: 0,
    existencia: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    console.log(this.miFormulario);
    this.miFormulario.resetForm({
      precio: 0,
      existencia: 0
    });
  }

  nombreValido(): boolean {
    return this.miFormulario?.controls.producto?.invalid && this.miFormulario?.controls.producto?.touched;
  }

  precioValido(): boolean {
    return this.miFormulario?.controls.precio?.touched && this.miFormulario?.controls.precio?.value < 0;
  }

}
