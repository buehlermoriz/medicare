import { Component, OnInit } from '@angular/core';
import { EventInput } from '@fullcalendar/angular';
import * as moment from 'moment';
import { TodoService } from '../todo.service';

export const INITIAL_EVENTS: EventInput[] = [];

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class eventutils implements OnInit {
  
  constructor(private todoService: TodoService) { }
  
  ngOnInit(): void {
    this.events()
  }
  

  
  async events()  {
    let todos =  this.todoService.getAll();
    
    for(let todo of await todos){
    var DateFormated = (moment(todo.consumption)).format('YYYY-MM-DD')
    INITIAL_EVENTS.push(
  
     { id: todo.id,
      title: todo.medicine,
      start: DateFormated,
      end: DateFormated},)
    };
    console.log(INITIAL_EVENTS.values.toString)
  }
  }





