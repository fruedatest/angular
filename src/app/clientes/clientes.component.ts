import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
    buttonsStyling: false,
  });

  constructor(private clienteService: ClienteService) {
    //this.clienteService = clienteService;
  }

  ngOnInit() {
    //Instanciar constante CLIENTES de otra clase en el array cliente[]
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      //#####################
      title: '¿Estás seguro?',
      text: "El usuario será borrado y no podrá revertirse",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Usuario eliminado',
              'El usuario se ha eliminado con éxito.',
              'success'
            )
          }
        )
      }
      //#####################
    })

  }

}
