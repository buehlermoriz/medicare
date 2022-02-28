import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { createEventId } from './event-ulits';


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
    select: this.syncCalendar.bind(this),
    events: [
      { title: 'event 1', date: '2022-02-05' },
      { title: 'event 2', date: '2019-02-04' }
    ]
  };


  syncCalendar(selectInfo: DateSelectArg)  {
   
  let todos =  this.todoService.getAllCalendar();
  const calendarApi = selectInfo.view.calendar;
  calendarApi.unselect();
  alert(selectInfo.view.calendar);
  /*
for(let todo in todos){
  calendarApi.addEvent({
    id: todo.id,
    title: todo.medicine,
    start: selectInfo.startStr,
    end: selectInfo.endStr,
  });

}*/

calendarApi.addEvent({
  id: "1",
  title: "test",
  start: selectInfo.startStr,
  end: selectInfo.endStr,
})
}
}



