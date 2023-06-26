import { Component } from '@angular/core';
import { Elemento } from 'src/interface/elemento.interface';
import { ApiService } from '../service/api.service';
import {  ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

  options = {
    locale: 'es-ES', // Cambia el idioma a español
    timezone: 'UTC' // Cambia la zona horaria a UTC
  };
  
  elementos: Elemento[] = []; ;
  dataSource:any;
  columnas: string[] = ['Nombre','Correo', 'Clave','nombre_dispositivo' ,'url','fecha', 'estado','descripcion_estado'];
  constructor(private api: ApiService){
    this.dataSource = new MatTableDataSource<Elemento>([]);
  }
  

  ngOnInit() {
    this.api.obtenerDatos().subscribe((respon)=>{
      this.elementos = respon;
      this.dataSource = new MatTableDataSource<Elemento>(this.elementos);
      this.dataSource.paginator = this.paginator;
    });

  }

  editarElemento(elemento: Elemento) {
    // Lógica para editar el elemento
    console.log('Editar:', elemento);
  }

  eliminarElemento(elemento: Elemento) {
    // Lógica para eliminar el elemento
    console.log('Eliminar:', elemento);
  }
}
