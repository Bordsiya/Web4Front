import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DotsService } from '../../model/dots/dots.service';
import { Hit } from '../../model/dots/hit';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input('content') $content!: Subject<Hit[]>;
  content: Hit[] = [];

  constructor() { }

  ngOnInit(): void {
      this.$content.subscribe(newValues => {
        this.content = newValues;
        console.log(this.content);
    })
  }

}
