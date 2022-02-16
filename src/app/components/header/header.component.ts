import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fio: string;
  group: string;
  variant: number;

  constructor() { 
    this.fio = "Бордун Анастасия Владимировна";
    this.group = "P3211";
    this.variant = 9127;
  }

  ngOnInit(): void {
  }

}
