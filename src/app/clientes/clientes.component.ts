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
  habilitar: boolean = true;

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
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        )
      }
      //#####################
    })
  }

  setHabilitar(): void{
    this.habilitar = (this.habilitar == true) ? false : true;
  }

}
