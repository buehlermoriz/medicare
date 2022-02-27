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
    this.todos = await this.todoService.getAll();
  }
  async postNewContent(todo: Todo){
    var textDescription = (<HTMLInputElement>document.getElementById("newDescription")).value; 
    console.log(textDescription);
    await this.todoService.deleteToDoNewContent(todo, textDescription);
  }
}
