import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',

})
export class ClientesComponent implements OnInit {
  clientes!: Cliente[];

  constructor() { }

  ngOnInit(){
    //Instanciar constante CLIENTES de otra clase en el array cliente[]
    this.clientes = CLIENTES;

  }

  

}
