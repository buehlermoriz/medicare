import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

/*export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}*/

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
 

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.syncCalendar();
   
  }
  /*
  tiles: Tile[] = [
    {text: 'Hallo Das sind Wir.', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  */
  }

  