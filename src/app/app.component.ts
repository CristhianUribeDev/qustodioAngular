
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  showContent: boolean = false;
  toggleContent() {
    this.showContent = !this.showContent;
  }
}
