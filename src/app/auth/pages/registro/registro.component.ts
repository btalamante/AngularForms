import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from "../../../shared/validators/validaciones";
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  /**
   * Definición del formulario
   */
  miFormulario: FormGroup = this.formBuilder.group({
    /**
     * Recordemos que el primer arreglo de Validator son para las validaciones sync, el segundo son las async
     * pattern puede recibir un string o una RegExp, podemos agregar la propiedad nombreApellidoPattern para evaluar el nombre
     * usando expresiones regulares
     * Se ejecutan en el orden que las declaramos
     */
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    /**
     * Validators.email, angula cuenta con una validación especial para email ya predefinida y es síncrona
     * no es muy buena validación, por eso usaremos expresiones regulares
     * En este ejemplo usamos una validación async que hará una requisicón http a un endpoint
     * Unicamente se manda la referencia del servicio ya que dentro del mismo ya se hace la implementación del AsyncValidator
     */
    // email: ['', [Validators.required, Validators.email]]
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    /**
     * Para user name creamos una función para validar el username como validación personalizada
     * Se evía la referencia a la función más no se ejecuta
     */
    username: ['', [Validators.required, this.validatorService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    /**
     * Opciones para poder implementar validaciones a nivel de función
     */
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });


  get emailErrorMsg(): string {
    const error: ValidationErrors | null | undefined = this.miFormulario.get('email')?.errors;
    if (error?.required) {
      return 'El email es obligatorio';
    } else if (error?.pattern) {
      return 'El valor ingresado no tiene formato correcto';
    } else if (error?.emailTomado) {
      return 'El email ya no está disponible';
    }
    return '';
  }

  constructor(private formBuilder: FormBuilder, private validatorService: ValidatorService, private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Braulio Talamante',
      email: 'test1@test.com',
      username: 'OldSnake',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

  /**
   * Podemos factorizar todo esto
   */
  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.required && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.pattern && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.emailTomado && this.miFormulario.get('email')?.touched;
  // }



}
