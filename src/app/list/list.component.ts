import { Component } from '@angular/core';
import { Elemento } from 'src/interface/elemento.interface';
import { ApiService } from '../service/api.service';
import {  ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;
  tiempoRestante: number = environment.tiempo_refresco; // Tiempo en segundos
  intervalId: any;
  red_url: String = environment.redirect_url;

  elementos: Elemento[] = [];
  onSave: Elemento = {
    id: 0,
    nombre: '',
    correo: '',
    clave: '',
    nombre_dispositivo: '',
    url: '',
    estado: 0,
    fecha: '',
    descripcion_estado: '',
    url_browser_stack:''
  };;
  dataSource:any;
  columnas: string[] = ['Nombre','Correo', 'Clave','nombre_dispositivo' ,'url','fecha','descripcion_estado','Acciones'];

  constructor(private api: ApiService){
    this.dataSource = new MatTableDataSource<Elemento>([]);
  }

  ngOnInit() {
    this.obtenerData();
    this.startCountdown();
  }

  obtenerData(){
    this.api.obtenerDatos().subscribe((respon)=>{
      this.elementos = respon;
      this.dataSource = new MatTableDataSource<Elemento>(this.elementos);
      this.dataSource.paginator = this.paginator;
    });
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        //clearInterval(this.intervalId);
        this.tiempoRestante = environment.tiempo_refresco;
        this.obtenerData();
          // Hacer algo cuando la cuenta regresiva llegue a cero
        
      }
    }, 1000); // Intervalo de 1 segundo
  }

  registrar(){
    Swal.fire({
      title: 'Ingrese datos para la Prueba',
      html:
        '<input id="name" class="swal2-input" placeholder="Nombre">' +
        '<input id="email" class="swal2-input" placeholder="Correo electrónico">'+
        '<input id="clave" class="swal2-input" placeholder="Contraseña">'+
        '<input id="nombre_dispositivo" class="swal2-input" placeholder="Nombre del Dispositivo">'+
        '<input id="url" class="swal2-input" placeholder="URL">',
      focusConfirm: false,
      confirmButtonText: 'Guardar Datos',
      preConfirm: () => {
        return {
          name: (document.getElementById('name') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          clave: (document.getElementById('clave') as HTMLInputElement).value,
          nombre_dispositivo: (document.getElementById('nombre_dispositivo') as HTMLInputElement).value,
          url: (document.getElementById('url') as HTMLInputElement).value
        };
      }
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.onSave.nombre = result.value.name;
        this.onSave.correo = result.value.email;
        this.onSave.clave = result.value.clave;
        this.onSave.nombre_dispositivo = result.value.nombre_dispositivo;
        this.onSave.url = result.value.url;
        this.api.enviarDatos(this.onSave).subscribe(
          (response: any) => {
            Swal.fire({
              title: '¡Éxito!',
              text: response.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.obtenerData();
          },
          (error: any) => {
            Swal.fire({
              title: '¡Algo inesperado ocurrió!',
              text: error.error,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        );
      }
    });
  }


}
