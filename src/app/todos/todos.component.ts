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

  async add(medicine: string, description: string, consumption_date: any, consumption_day: Date | null, consumption_times: number) {
    await this.todoService.add(medicine, description, consumption_date, consumption_day, consumption_times);
    await this.loadTodos();
  }

  async sync() {
    await this.todoService.sync();
    await this.loadTodos();
  }

  async toggleDone(todo: Todo) {
    await this.todoService.toggleDone(todo);
    await this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.todoService.getAll();
  }

  async checkedBoexes(){
    var array:string[] = []

    let element = <any> document.getElementsByName("Monday");  
    if (element.checked) { 
    array.push("Monday");
    }
   return array

  }
 
  
}
