import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import * as moment from 'moment';
import { TodoService } from '../todo.service';
//import { INITIAL_EVENTS } from './eventutils';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
   
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
   // initialEvents: INITIAL_EVENTS,
    select: this.syncCalendar.bind(this),
    events: [
    ]
  };


async syncCalendar(selectInfo: DateSelectArg)  {

  let todos =  this.todoService.getAll();
  const calendarApi = selectInfo.view.calendar;
  calendarApi.unselect();
  
for(let todo of await todos){
  var DateFormated = (moment(todo.consumption)).format('YYYY-MM-DD')
  calendarApi.addEvent({
    id: todo.id,
    title: todo.medicine,
    start: DateFormated,
    end: DateFormated,
  });
}
}
}



