import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }
   
  // async load (todo: Todo){
  //   return todo;
  // }
  async loadStart(){
    console.log("loaded")
    this.todos = await this.todoService.getAll();
  }

  async PutMethod(todo: Todo, NewDescription:string, description:string){
     await this.todoService.PutMethod(todo, NewDescription, description);
     
  }
  
}
