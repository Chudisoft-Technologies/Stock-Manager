import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js"
import "bootstrap/dist/js/bootstrap.min.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'stock-manager';
}
