import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  breakpoint: number | undefined;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.syncCalendar();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;    
  }
  
  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }
  }

  