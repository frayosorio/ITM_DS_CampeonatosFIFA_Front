import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Seleccion } from '../../shared/entidades/seleccion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}selecciones/`;
  }

  public listar(): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}listar`);
  }

  public buscar(dato: String): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(`${this.url}buscar/${dato}`);
  }

  public agregar(seleccion: Seleccion): Observable<Seleccion> {
    return this.http.post<Seleccion>(`${this.url}agregar`, seleccion);
  }

  public modificar(seleccion: Seleccion): Observable<Seleccion> {
    return this.http.put<Seleccion>(`${this.url}modificar`, seleccion);
  }

  public eliminar(idSeleccion: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${idSeleccion}`);
  }

}
