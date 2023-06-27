import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Elemento } from 'src/interface/elemento.interface';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const descripciones: { [key: number]: string } = {
    0: 'NUEVO',
    1: 'REGISTRO CON CYPRESS',
    2: 'REGISTRO CON MOVIL',
    3: 'REGISTRO REGLA, TERMINO LA PRUEBA'
  };

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.api_url;

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
