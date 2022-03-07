import { Component, OnInit } from '@angular/core';
import {EventInput, CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { TodoService } from '../todo.service';

const INITIAL_EVENTS: EventInput[] = [];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
   
  constructor(private todoService: TodoService) {
  }
  
  ngOnInit(): void {
    this.syncCalendar();
    console.log(INITIAL_EVENTS);
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    initialEvents: INITIAL_EVENTS,   
  };
  
 async syncCalendar()  {
  let todos =  this.todoService.getAll();

  if(INITIAL_EVENTS.length != (await todos).length){
    for(let todo of await todos){
      var DateFormated = (moment(todo.consumption)).format('YYYY-MM-DD')
      INITIAL_EVENTS.push(
        
        { id: todo.id,
          title: todo.medicine,
          start: DateFormated,
          end: DateFormated},)
        };
    console.log( INITIAL_EVENTS);
      }
      else{
        return
      }


    }
}



