import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  todo?:Todo;

  constructor(private todoService: TodoService, private  activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }
   
  // async load (todo: Todo){
  //   return todo;
  // }
  async loadStart(){
    console.log("loaded")
    this.todo = (await this.todoService.getAll()).find(t => t.id === this.activatedRoute.snapshot.params['id']);
  }

  async PutMethod(todo: Todo, NewDescription:string, description:string){
     await this.todoService.PutMethod(todo, NewDescription, description);
     
  }
  
}
