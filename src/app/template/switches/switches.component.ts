import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  persona = {
    genero: '',
    notificaciones: false,
  };

  terminosYCondiciones: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
