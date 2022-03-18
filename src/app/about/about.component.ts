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
  
  }

  