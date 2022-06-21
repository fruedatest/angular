import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html' //Llamada al componente html
})

export class HeaderComponent {
    title:string = 'App angular'
}
