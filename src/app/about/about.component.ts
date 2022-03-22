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
      document.getElementById("animatedTitle")!.style.display = "none";
      document.getElementById("mobileTitle")!.style.display = "block";

    }else if (window.innerWidth >= 1400) {
      document.getElementById("animatedTitle")!.style.display = "none";
      document.getElementById("mobileTitle")!.style.display = "block";

    }
     else {
      document.getElementById("mobileTitle")!.style.display = "none";
      document.getElementById("animatedTitle")!.style.display = "block";
    }
  }
  }

  