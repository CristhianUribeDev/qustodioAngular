import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-tecnologies',
  templateUrl: './tecnologies.component.html',
  styleUrls: ['./tecnologies.component.css']
})
export class TecnologiesComponent {
  basePath: string;

  constructor(private location: Location) {
    this.basePath = this.location.prepareExternalUrl('assets/images/');
  }
}
