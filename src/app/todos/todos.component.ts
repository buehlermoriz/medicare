import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  selected = "1"

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  async add( medicine: string,
    description: string, 
     consumption_day: Date | null,
     consumption_monday: boolean,
   consumption_tuesday: boolean,
   consumption_wednesday: boolean,
   consumption_thirsday: boolean,
   consumption_friday: boolean,
   consumption_satturday: boolean,
   consumption_sunday: boolean,
   consumption_morning : boolean,
   consumption_midday : boolean,
   consumption_evening : boolean) {
   var id =   await this.todoService.add(medicine, description, consumption_day, consumption_monday, consumption_tuesday, consumption_wednesday, consumption_thirsday, consumption_friday, consumption_satturday, consumption_sunday, consumption_morning, consumption_midday, consumption_evening );
    await this.loadTodos();
  }

  async sync() {
    await this.todoService.sync();
    await this.loadTodos();
  }
   async delete(todo: Todo)  {
    await this.todoService.deleteToDo(todo);
     
  }
  

  async toggleDone(todo: Todo) {
    await this.todoService.toggleDone(todo);
    await this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.todoService.getAll();
  }
 
  
}
