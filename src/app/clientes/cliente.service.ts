import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8000/api/clientes';

  constructor(private http: HttpClient) { }

  //Proceso asíncrono
  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  } 

}
