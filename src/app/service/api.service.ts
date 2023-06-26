import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Elemento } from 'src/interface/elemento.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

const descripciones: { [key: number]: string } = {
    0: 'Opcion 0',
    1: 'Opcion 1',
    2: 'Opcion 2',
    3: 'Opcion 3'
  };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://qustodio.newt.pe:9828'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  enviarDatos(datos: Elemento): Observable<any> {
    return this.http.post(`${this.apiUrl}/datos`, datos);
  }
  
  obtenerDatos() : Observable <Elemento[]> {
    return this.http.get(`${this.apiUrl}/datosCompletos`).pipe(
      map((response: any) => {
        return response.map((item: Elemento) => {
          item.descripcion_estado = descripciones[item.estado];
          return item;
        });
      })
    );
  }
}
