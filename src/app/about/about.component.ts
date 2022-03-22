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
    this.onResize(window);
  }
  
  onResize(event: any) {
    if (window.innerWidth <= 600) {
      this.breakpoint = 1;
      document.getElementById("animatedTitle")!.style.display = "none";
      document.getElementById("mobileTitle")!.style.display = "block";

    }else if (window.innerWidth >= 1500) {
      this.breakpoint = 2;
      document.getElementById("animatedTitle")!.style.display = "none";
      document.getElementById("mobileTitle")!.style.display = "block";

    }
     else {
      this.breakpoint = 2;
      document.getElementById("mobileTitle")!.style.display = "none";
      document.getElementById("animatedTitle")!.style.display = "block";
    }
  }
  }

  