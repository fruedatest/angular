import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',

})
export class FormComponent implements OnInit {

  titulo:string = "Crear clientes";

  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo usuario', `Usuario: ${cliente.nombre} creado con éxito`, 'success');
      }
      );
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id){
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.cliente = cliente
          )
        }
      }
    )
  }

}
