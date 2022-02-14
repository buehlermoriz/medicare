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

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  async add(medicine: string, description: string, consumption_date: string, consumption_day: Date | null, consumption_times: number) {
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
    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

   /* for (var i = 0; i < checkboxes.length; i++) {
      const value = checkboxes[i].
      array.push(<HTMLInputElement>checkboxes[i].value)
    }
*/
  }
 
  
}
