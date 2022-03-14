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
    this.loadStart();
    this.todoService.getAll();
  }
   
  // async load (todo: Todo){
  //   return todo;
  // }
  async loadStart(){
    console.log("loaded")
    this.todo = (await this.todoService.getAll()).find(t => t.id === this.activatedRoute.snapshot.params['id']);
  }

  async PutMethodNewDescription(todo: Todo, NewDescription:string){
     await this.todoService.PutMethodDescription(todo, NewDescription, todo.description);
     
  }
  async PutMethodNewMedicineName(todo: Todo, NewMedicineName:string){
    await this.todoService.PutMethodNewMedicineName(todo, NewMedicineName, todo.medicine);
  
     }

     async PutMethodCheckTime(todo: Todo, check_consumption_evening:boolean, check_consumption_midday:boolean, check_consumption_morning:boolean){
      await this.todoService.PutMethodCheckTime(todo, check_consumption_evening, check_consumption_midday,check_consumption_morning,);
      }

      async PutMethodCheckDays(todo: Todo,check_consumption_monday:boolean,check_consumption_tuesday:boolean, check_consumption_wednesday:boolean, check_consumption_thirsday:boolean,check_consumption_friday:boolean, check_consumption_satturday:boolean, check_consumption_sunday:boolean ){
        await this.todoService.PutMethodCheckDays(todo, check_consumption_monday,check_consumption_tuesday, check_consumption_wednesday, check_consumption_thirsday,check_consumption_friday, check_consumption_satturday, check_consumption_sunday);
        }
        async PutMethodNewConsumptionDate(todo: Todo, new_consumption_day:Date){
          await this.todoService.PutMethodNewConsumptionDate(todo, new_consumption_day, todo.consumption);
          
       }

 async PutMethod(todo: Todo, NewDescription:string, NewMedicineName:string, check_consumption_evening:boolean,check_consumption_midday:boolean, check_consumption_morning:boolean 
  ,new_consumption_day:Date){
  await this.PutMethodNewDescription(todo, NewDescription);
  await this.PutMethodNewMedicineName(todo, NewMedicineName);
  await this.PutMethodCheckTime(todo, check_consumption_evening, check_consumption_midday, check_consumption_morning);
  //await this.PutMethodCheckDays(todo, check_consumption_monday,check_consumption_tuesday, check_consumption_wednesday, check_consumption_thirsday,check_consumption_friday, check_consumption_satturday, check_consumption_sunday);
  await this.PutMethodNewConsumptionDate(todo, new_consumption_day);
}
  
}
