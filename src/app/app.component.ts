import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Web4Front';
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: "Home",
        routerLink: ['/home']
      },
      {
        label: "Login",
        routerLink: ['/auth/login']
      }
    ];
  }
}
