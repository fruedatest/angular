import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8000/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  //Proceso asíncrono
  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http
      .get<Cliente[]>(this.urlEndPoint)
      .pipe(map((response) => response as Cliente[]));
  }

  /* VERSION 1
  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }
  */

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          Swal.fire('Error al crear el usuario', e.error.error, 'error');
          return throwError(() => new Error(e));
        })
      );
  }

  /* VERSION 1
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }
  */

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar el usuario', e.error.error, 'error');
        return throwError(() => new Error(e));
      })
    );
  }

  /* VERSION 1
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.urlEndPoint}/${cliente.id}`,
      cliente,
      { headers: this.httpHeaders }
    );
  }
  */

  update(cliente: Cliente): Observable<Cliente> {
    return this.http
      .put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.error);
          Swal.fire('Error al actualizar el usuario', e.error.mensaje);
          return throwError(() => new Error(e));
        })
      );
  }

  /* VERSION 1
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }
  */

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(catchError((e) => {
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar el cliente', e.error.error, 'error');
        return throwError(() => new Error(e));
      }));
  }
}
