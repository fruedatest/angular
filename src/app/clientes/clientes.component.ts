import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',

})
export class ClientesComponent implements OnInit {
  clientes!: Cliente[];

  constructor(private clienteService: ClienteService) {
    //this.clienteService = clienteService;
   }

  ngOnInit(){
    //Instanciar constante CLIENTES de otra clase en el array cliente[]
    this.clientes = this.clienteService.getCliente();

  }

  

}
