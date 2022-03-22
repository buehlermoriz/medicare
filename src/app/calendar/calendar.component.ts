import { Component, OnInit } from '@angular/core';
import {CalendarOptions } from '@fullcalendar/angular';
import { TodoService, INITIAL_EVENTS } from '../todo.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(private todoService: TodoService) {
  }
  
  ngOnInit(): void {
    this.todoService.syncCalendar(); 
    this.toggleVisible();

  }

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'title',
      center: '',
      right:  (window.innerWidth <= 600) ?'prev,next' : 'prev,next today'
    },
    initialView: (window.innerWidth <= 600) ?'dayGridWeek' : 'dayGridMonth' ,
    handleWindowResize: true,
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    initialEvents: INITIAL_EVENTS,   
    
  };
  toggleVisible(){
if(window.innerWidth <= 600){
  document.getElementById('tipp')!.style.display="block";
}
else{
  document.getElementById('tipp')!.style.display="none";
}
  }
}



