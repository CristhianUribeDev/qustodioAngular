import { Component } from '@angular/core';
import { Elemento } from 'src/interface/elemento.interface';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

  elemento: Elemento = {
    id: 0,
    nombre: '',
    correo: '',
    clave: '',
    nombre_dispositivo: '',
    url: '',
    estado: 0,
    fecha: '',
    descripcion_estado: ''
  };

  constructor(private api: ApiService){

  }
  guardarCambios() {
    // Lógica para guardar los cambios del elemento
    console.log('Guardar cambios:', this.elemento);
    this.api.enviarDatos(this.elemento).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.error(error)
        // Manejar errores
      }
    );
  }
}
